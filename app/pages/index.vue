<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import { useSiteContent } from '~/composables/useSiteContent'

const { t, locale } = useI18n()

const heroTitleClass = computed(() =>
  locale.value === 'es'
    ? 'lg:text-[4.25rem] xl:text-[4.4rem]'
    : 'lg:text-[5.25rem] xl:text-[5.75rem]',
)
const localePath = useLocalePath()
const { data: site } = await useSiteContent()
const { data: projects } = await useProjects(true)

const serviceIcons = ['lucide:files', 'lucide:shopping-bag', 'lucide:smartphone', 'lucide:workflow', 'lucide:refresh-cw']
const capabilityIcons = ['lucide:blocks', 'lucide:database-zap', 'lucide:panel-top', 'lucide:smartphone', 'lucide:cloud-upload', 'lucide:mouse-pointer-click']

useSeoMeta({
  title: () => site.value?.hero.title,
  description: () => site.value?.hero.description,
  ogTitle: () => site.value?.hero.title,
  ogDescription: () => site.value?.hero.description,
})
</script>

<template>
  <div v-if="site">
    <section class="hero-section relative overflow-hidden border-b border-line">
      <div class="hero-layout site-container relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(25rem,.96fr)] lg:gap-5">
        <div>
          <p class="eyebrow">{{ site.hero.eyebrow }}</p>
          <h1
            class="hero-title mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-7xl"
            :class="heroTitleClass"
          >
            {{ site.hero.title }}
          </h1>
          <p class="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl">{{ site.hero.description }}</p>
          <div class="mt-9 flex flex-wrap gap-3">
            <NuxtLink :to="localePath('contact')" class="button-primary inline-flex"><Icon name="heroicons:chat-bubble-left-right" class="button-icon" aria-hidden="true" />{{ t('actions.startConversation') }}</NuxtLink>
            <NuxtLink :to="localePath('projects')" class="button-secondary inline-flex"><Icon name="heroicons:squares-2x2" class="button-icon" aria-hidden="true" />{{ t('actions.viewProjects') }}</NuxtLink>
          </div>
        </div>
        <HomeHeroMotionVisual />
      </div>
    </section>

    <section>
      <div class="site-container section-space">
        <SharedSectionHeader :eyebrow="t('home.projectsEyebrow')" :title="t('home.projectsTitle')" />
        <div class="mt-16 grid gap-x-8 gap-y-16 lg:grid-cols-3">
          <ProjectCard v-for="(project, index) in projects" :key="project.id" v-reveal="index * 80" :project="project" />
        </div>
        <NuxtLink :to="localePath('projects')" class="button-secondary mt-14 inline-flex"><Icon name="heroicons:arrow-up-right" class="button-icon" aria-hidden="true" />{{ t('actions.allProjects') }}</NuxtLink>
      </div>
    </section>

    <section id="solutions" class="site-container section-space scroll-mt-24">
      <SharedSectionHeader :eyebrow="t('home.servicesEyebrow')" :title="t('home.servicesTitle')" />
      <div class="mt-12 grid border-t border-line md:grid-cols-2 lg:grid-cols-3">
        <article v-for="(service, index) in site.services" :key="service.title" v-reveal="(index % 3) * 70" class="service-row grid grid-cols-[2rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line py-6 md:px-6 md:first:pl-0 md:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(2n+1)]:pl-6 lg:[&:nth-child(3n+1)]:pl-0">
          <span class="pt-1 font-mono text-xs text-muted">0{{ index + 1 }}</span>
          <div>
            <h3 class="text-xl font-semibold">{{ service.title }}</h3>
            <p class="mt-2 max-w-lg text-sm leading-6 text-muted">{{ service.description }}</p>
          </div>
          <SharedLineIllustration :icon="serviceIcons[index] ?? 'lucide:sparkles'" :tone="index" :delay="index * -460" mini />
        </article>
      </div>
    </section>

    <section class="site-container pb-[clamp(5rem,10vw,9rem)]">
      <SharedTechnologyEcosystem v-reveal />
    </section>

    <section id="capabilities" class="surface border-y border-line scroll-mt-24">
      <div class="site-container section-space">
        <SharedSectionHeader :eyebrow="t('home.capabilitiesEyebrow')" :title="t('home.capabilitiesTitle')" />
        <div class="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-[color:var(--line)] md:grid-cols-2 lg:grid-cols-3">
          <article v-for="(capability, index) in site.capabilities" :key="capability.title" v-reveal="(index % 3) * 70" class="capability-tile surface p-7">
            <div class="flex items-start justify-between gap-4">
              <h3 class="font-semibold">{{ capability.title }}</h3>
              <SharedLineIllustration :icon="capabilityIcons[index] ?? 'lucide:sparkles'" :tone="index + 1" :delay="index * -420" compact />
            </div>
            <p class="mt-3 text-sm leading-6 text-muted">{{ capability.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-reveal class="site-container section-space text-center">
      <h2 class="mx-auto max-w-4xl text-balance text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{{ t('home.ctaTitle') }}</h2>
      <p class="mx-auto mt-6 max-w-xl text-lg text-muted">{{ t('home.ctaDescription') }}</p>
      <NuxtLink :to="localePath('contact')" class="button-primary mt-8 inline-flex"><Icon name="heroicons:chat-bubble-left-right" class="button-icon" aria-hidden="true" />{{ t('actions.startConversation') }}</NuxtLink>
    </section>
  </div>
</template>
