<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen">
    <UiScrollProgress />
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[color:var(--ink)] focus:px-4 focus:py-3 focus:text-[color:var(--page)]">{{ t('a11y.skip') }}</a>
    <LayoutHeader />
    <main id="main-content"><slot /></main>
    <LayoutFooter />
  </div>
</template>
