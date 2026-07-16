<script setup lang="ts">
defineProps<{ error: { statusCode?: number } }>()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <main class="grid min-h-screen place-items-center px-6">
    <div class="max-w-lg text-center">
      <p class="eyebrow">{{ error.statusCode || 404 }}</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight">{{ t('error.title') }}</h1>
      <p class="mt-4 text-balance text-lg text-muted">{{ t('error.description') }}</p>
      <NuxtLink :to="localePath('index')" class="button-primary mt-8 inline-flex"><Icon name="heroicons:home" class="button-icon" aria-hidden="true" />{{ t('error.action') }}</NuxtLink>
    </div>
  </main>
</template>
