import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

test.use({ locale: 'es-AR' })

const routes = ['/', '/servicios', '/proyectos', '/nosotros', '/contacto']

async function waitForHydration(page: Page) {
  await expect(page.locator('html')).toHaveAttribute('data-app-ready', 'true')
}

for (const route of routes) {
  test(`${route} has a clear page heading and no serious accessibility violations`, async ({ page }) => {
    await page.goto(route)

    await expect(page.locator('h1')).toHaveCount(1)

    const scan = await new AxeBuilder({ page }).analyze()
    const seriousViolations = scan.violations.filter(violation =>
      violation.impact === 'serious' || violation.impact === 'critical',
    )

    expect(seriousViolations).toEqual([])
  })
}

test.describe('mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('opens with focus and closes with Escape', async ({ page }) => {
    await page.goto('/')
    await waitForHydration(page)

    const menuButton = page.getByRole('button', { name: 'Abrir menú' })
    await menuButton.click()

    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#mobile-navigation a').first()).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})

test('theme control applies an explicit color mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('/')
  await waitForHydration(page)

  const html = page.locator('html')
  const initialMode = await html.evaluate(element => element.classList.contains('dark') ? 'dark' : 'light')
  await page.getByRole('button', { name: 'Cambiar tema' }).click()

  await expect(html).toHaveClass(initialMode === 'dark' ? /light/ : /dark/)
})

test('hero visual responds to pointer movement and reduced-motion preferences', async ({ page }) => {
  await page.goto('/')
  await waitForHydration(page)

  const visual = page.locator('.motion-visual')
  await expect(visual).toHaveAttribute('aria-hidden', 'true')

  const bounds = await visual.boundingBox()
  expect(bounds).not.toBeNull()
  await page.mouse.move(bounds!.x + bounds!.width * 0.8, bounds!.y + bounds!.height * 0.3)

  await expect.poll(() => visual.evaluate(element => element.style.getPropertyValue('--rotate-y'))).not.toBe('0deg')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => page.locator('.motion-card').first().evaluate(element => getComputedStyle(element).animationName)).toBe('none')
  await expect.poll(() => page.locator('.project-card').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1')
})

test('scroll reveals content and updates reading progress', async ({ page }) => {
  await page.goto('/')
  await waitForHydration(page)

  const service = page.locator('.service-row').first()
  await service.scrollIntoViewIfNeeded()
  await expect(service).toHaveClass(/is-revealed/)

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  const progress = page.locator('.scroll-progress')
  await expect.poll(async () => Number(await progress.evaluate(element => element.style.getPropertyValue('--scroll-progress')))).toBeGreaterThan(0.9)
})

test.describe('desktop hero geometry', () => {
  test.use({ viewport: { width: 1920, height: 948 } })

  test('uses the same viewport frame in Spanish and English', async ({ page }) => {
    await page.goto('/')
    const spanishBounds = await page.locator('.hero-layout').boundingBox()
    const spanishTitleBounds = await page.locator('.hero-title').boundingBox()

    await page.goto('/en')
    const englishBounds = await page.locator('.hero-layout').boundingBox()
    const englishTitleBounds = await page.locator('.hero-title').boundingBox()

    expect(spanishBounds).not.toBeNull()
    expect(englishBounds).not.toBeNull()
    expect(spanishTitleBounds).not.toBeNull()
    expect(englishTitleBounds).not.toBeNull()
    expect(Math.abs(spanishBounds!.y - englishBounds!.y)).toBeLessThan(1)
    expect(Math.abs(spanishBounds!.height - englishBounds!.height)).toBeLessThan(1)
    expect(spanishTitleBounds!.height).toBeLessThanOrEqual(englishTitleBounds!.height + 20)
  })
})
