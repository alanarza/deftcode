<script setup lang="ts">
import { useSiteContent } from '~/composables/useSiteContent'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: site } = await useSiteContent()
const principleIcons = ['lucide:scan-search', 'lucide:orbit', 'lucide:messages-square']
useSeoMeta({ title: () => t('about.title'), description: () => t('about.description') })
</script>

<template>
  <div v-if="site">
    <section class="site-container section-space grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
      <div>
        <SharedSectionHeader as="h1" :eyebrow="t('about.eyebrow')" :title="t('about.title')" :description="t('about.description')" />
        <p v-reveal class="mt-10 max-w-3xl text-lg leading-8 md:text-xl md:leading-9">{{ t('about.body') }}</p>
      </div>
      <AboutPartnershipVisual
        v-reveal="100"
        :core="t('aboutVisual.core')"
        :labels="[t('aboutVisual.context'), t('aboutVisual.product'), t('aboutVisual.evolution')]"
        :status="t('aboutVisual.status')"
      />
    </section>
    <section id="principles" class="border-y border-line surface scroll-mt-24">
      <div class="site-container section-space grid gap-px overflow-hidden md:grid-cols-3">
        <article v-for="(principle, index) in site.principles" :key="principle.title" v-reveal="index * 80" class="principle-card border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
          <div class="flex items-start justify-between gap-4">
            <span class="font-mono text-xs text-muted">0{{ index + 1 }}</span>
            <SharedLineIllustration :icon="principleIcons[index] ?? 'lucide:sparkles'" :tone="index + 2" :delay="index * -520" compact />
          </div>
          <h2 class="mt-5 text-xl font-semibold">{{ principle.title }}</h2>
          <p class="mt-3 leading-7 text-muted">{{ principle.description }}</p>
        </article>
      </div>
    </section>
    <section v-reveal class="site-container section-space text-center">
      <p class="eyebrow">{{ t('about.eyebrow') }}</p>
      <h2 class="mx-auto mt-5 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{{ t('home.ctaTitle') }}</h2>
      <NuxtLink :to="localePath('contact')" class="button-primary mt-8 inline-flex"><Icon name="heroicons:chat-bubble-left-right" class="button-icon" aria-hidden="true" />{{ t('actions.startConversation') }}</NuxtLink>
    </section>
  </div>
</template>
