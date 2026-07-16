<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  description?: string
  as?: 'h1' | 'h2'
}>(), {
  as: 'h2',
  description: undefined,
})
</script>

<template>
  <header v-reveal class="max-w-3xl">
    <p class="eyebrow">{{ eyebrow }}</p>
    <component :is="as" class="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{{ title }}</component>
    <p v-if="description" class="mt-6 max-w-2xl text-lg leading-8 text-muted">{{ description }}</p>
  </header>
</template>
