<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button type="button" class="icon-button grid size-10 place-items-center rounded-full border border-line" :aria-label="t('theme.toggle')" :title="t('theme.toggle')" @click="toggleTheme">
    <Icon :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="18" aria-hidden="true" />
  </button>
</template>
