<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const isOpen = ref(false)
const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

const links = computed(() => [
  { label: t('nav.services'), to: localePath('services') },
  { label: t('nav.projects'), to: localePath('projects') },
  { label: t('nav.about'), to: localePath('about') },
])

watch(isOpen, async (open) => {
  if (!open) return
  await nextTick()
  mobileNav.value?.querySelector<HTMLElement>('a')?.focus()
})
</script>

<template>
  <header class="site-header sticky top-0 z-50 border-b border-line backdrop-blur-xl" @keydown.esc="isOpen = false">
    <div class="site-container flex h-20 items-center justify-between gap-6">
      <NuxtLink :to="localePath('index')" class="brand-link" @click="isOpen = false"><UiBrand /></NuxtLink>

      <div class="ml-auto flex items-center gap-2">
        <nav class="mr-2 hidden items-center gap-6 text-sm md:flex" :aria-label="t('nav.menu')">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="nav-link">
            {{ link.label }}
          </NuxtLink>
        </nav>
        <NuxtLink :to="switchLocalePath(locale === 'es' ? 'en' : 'es')" class="icon-button grid h-10 min-w-10 place-items-center rounded-full border border-line px-3 text-xs font-semibold uppercase" :aria-label="t('locale.change')" :title="t('locale.change')" @click="isOpen = false">
          {{ locale === 'es' ? 'EN' : 'ES' }}
        </NuxtLink>
        <UiThemeToggle />
        <NuxtLink :to="localePath('contact')" class="button-primary hidden md:inline-flex"><Icon name="heroicons:chat-bubble-left-right" class="button-icon" aria-hidden="true" />{{ t('nav.contact') }}</NuxtLink>
        <button type="button" class="icon-button grid size-10 place-items-center rounded-full border border-line md:hidden" :aria-label="t('nav.menu')" :aria-expanded="isOpen" aria-controls="mobile-navigation" @click="isOpen = !isOpen">
          <Icon :name="isOpen ? 'lucide:x' : 'lucide:menu'" size="19" aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav v-if="isOpen" id="mobile-navigation" ref="mobileNav" class="site-container grid gap-1 border-t border-line py-4 md:hidden" :aria-label="t('nav.menu')">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="mobile-nav-link rounded-xl px-3 py-3 text-lg" @click="isOpen = false">{{ link.label }}</NuxtLink>
      <NuxtLink :to="localePath('contact')" class="mobile-nav-link rounded-xl px-3 py-3 text-lg" @click="isOpen = false">{{ t('nav.contact') }}</NuxtLink>
    </nav>
  </header>
</template>
