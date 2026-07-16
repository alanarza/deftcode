<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const appConfig = useAppConfig()
const config = useRuntimeConfig()
</script>

<template>
  <footer class="border-t border-line py-12">
    <div class="site-container grid gap-10 md:grid-cols-2">
      <div>
        <NuxtLink :to="localePath('index')" class="brand-link"><UiBrand /></NuxtLink>
        <p class="mt-3 max-w-sm text-sm text-muted">{{ t('footer.tagline') }}</p>
      </div>
      <div class="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
        <a v-for="channel in appConfig.contactChannels" :key="channel.type" :href="channel.href" class="interactive-link inline-flex items-center gap-2 text-sm" :target="channel.type === 'email' ? undefined : '_blank'" :rel="channel.type === 'email' ? undefined : 'noreferrer'">
          <Icon :name="channel.icon" aria-hidden="true" /> {{ channel.label }}
        </a>
      </div>
    </div>
    <div class="site-container mt-10 text-xs text-muted">© {{ new Date().getFullYear() }} {{ config.public.brandName }}. {{ t('footer.rights') }}</div>
  </footer>
</template>
