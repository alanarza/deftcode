import tailwindcss from '@tailwindcss/vite'

const siteName = process.env.NUXT_PUBLIC_SITE_NAME || 'deftcode'
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-14',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxt/eslint',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      siteName,
      siteUrl,
      contactEndpoint: process.env.NUXT_PUBLIC_CONTACT_ENDPOINT || '',
    },
  },
  site: {
    url: siteUrl,
    name: siteName,
    defaultLocale: 'es',
  },
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'es', language: 'es-AR', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    customRoutes: 'config',
    pages: {
      services: { es: '/servicios', en: '/services' },
      projects: { es: '/proyectos', en: '/projects' },
      'projects-slug': { es: '/proyectos/[slug]', en: '/projects/[slug]' },
      about: { es: '/nosotros', en: '/about' },
      contact: { es: '/contacto', en: '/contact' },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'site_locale',
      redirectOn: 'root',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  image: {
    format: ['avif', 'webp'],
    quality: 82,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  typescript: {
    typeCheck: false,
    strict: true,
  },
})
