<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()
useSeoMeta({ title: () => t('contact.title'), description: () => t('contact.description') })
</script>

<template>
  <div class="site-container section-space grid gap-16 lg:grid-cols-[1fr_1.1fr]">
    <div v-reveal>
      <SharedSectionHeader as="h1" :eyebrow="t('contact.eyebrow')" :title="t('contact.title')" :description="t('contact.description')" />
      <div class="mt-12">
        <p class="text-sm font-semibold">{{ t('contact.channels') }}</p>
        <ul class="mt-5 grid gap-3">
          <li v-for="channel in appConfig.contactChannels" :key="channel.type"><a :href="channel.href" :target="channel.type === 'email' ? undefined : '_blank'" :rel="channel.type === 'email' ? undefined : 'noreferrer'" class="interactive-link inline-flex items-center gap-3"><Icon :name="channel.icon" aria-hidden="true" />{{ channel.value }}</a></li>
        </ul>
      </div>
    </div>
    <div v-reveal="100" class="surface rounded-3xl border border-line p-6 md:p-10"><ContactForm /></div>
  </div>
</template>
