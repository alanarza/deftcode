<script setup lang="ts">
import { useSiteContent } from '~/composables/useSiteContent'

const { t } = useI18n()
const localePath = useLocalePath()
const { data: site } = await useSiteContent()

const serviceIcons = ['lucide:files', 'lucide:shopping-bag', 'lucide:smartphone', 'lucide:workflow', 'lucide:refresh-cw']
const capabilityIcons = ['lucide:blocks', 'lucide:database-zap', 'lucide:panel-top', 'lucide:smartphone', 'lucide:cloud-upload', 'lucide:mouse-pointer-click']

useSeoMeta({ title: () => t('services.title'), description: () => t('services.description') })
</script>

<template>
  <div v-if="site">
    <section class="site-container section-space grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
      <SharedSectionHeader as="h1" :eyebrow="t('services.eyebrow')" :title="t('services.title')" :description="t('services.description')" />
      <ServicesFlowVisual
        v-reveal="100"
        :title="t('servicesVisual.signal')"
        :labels="[t('servicesVisual.discover'), t('servicesVisual.build'), t('servicesVisual.evolve')]"
        :status="t('servicesVisual.status')"
      />
    </section>

    <section id="solutions" class="border-y border-line surface scroll-mt-24">
      <div class="site-container section-space">
        <div class="divide-y divide-[color:var(--line)] border-y border-line">
          <article v-for="(service, index) in site.services" :key="service.title" v-reveal="(index % 2) * 70" class="service-row grid gap-6 py-10 md:grid-cols-[4rem_4rem_1fr_1fr] md:items-start">
            <span class="font-mono text-xs text-muted">0{{ index + 1 }}</span>
            <SharedLineIllustration :icon="serviceIcons[index] ?? 'lucide:sparkles'" :tone="index" :delay="index * -460" compact />
            <h2 class="text-2xl font-semibold">{{ service.title }}</h2>
            <div>
              <p class="leading-7 text-muted">{{ service.description }}</p>
              <ul class="mt-5 flex flex-wrap gap-2">
                <li v-for="item in service.items" :key="item" class="rounded-full border border-line px-3 py-1.5 text-xs">{{ item }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="capabilities" class="site-container section-space scroll-mt-24">
      <SharedTechnologyEcosystem v-reveal />

      <div class="mt-24">
        <SharedSectionHeader :eyebrow="t('home.capabilitiesEyebrow')" :title="t('home.capabilitiesTitle')" />
        <div class="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-3">
          <article v-for="(capability, index) in site.capabilities" :key="capability.title" v-reveal="(index % 3) * 70" class="capability-tile surface p-7">
            <div class="flex items-start justify-between gap-4">
              <div>
                <span class="font-mono text-xs text-muted">0{{ index + 1 }}</span>
                <h2 class="mt-5 font-semibold">{{ capability.title }}</h2>
              </div>
              <SharedLineIllustration :icon="capabilityIcons[index] ?? 'lucide:sparkles'" :tone="index + 1" :delay="index * -420" compact />
            </div>
            <p class="mt-3 text-sm leading-6 text-muted">{{ capability.description }}</p>
          </article>
        </div>
        <NuxtLink v-reveal :to="localePath('contact')" class="button-primary mt-12 inline-flex"><Icon name="heroicons:chat-bubble-left-right" class="button-icon" aria-hidden="true" />{{ t('actions.startConversation') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>
