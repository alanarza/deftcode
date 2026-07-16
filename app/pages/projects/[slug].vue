<script setup lang="ts">
import { useProject } from '~/composables/useProjects'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const slug = computed(() => String(route.params.slug))
const { data: project } = await useProject(slug)

const technologyLogos: Record<string, { src: string, adaptive?: boolean }> = {
  Laravel: { src: '/images/technology/laravel.svg' },
  Nuxt: { src: '/images/technology/nuxt.svg' },
  Flutter: { src: '/images/technology/flutter.svg' },
}

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => project.value?.seo.title,
  description: () => project.value?.seo.description,
  ogTitle: () => project.value?.seo.title,
  ogDescription: () => project.value?.seo.description,
  ogImage: () => project.value?.seo.image,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <article v-if="project">
    <header class="site-container pb-9 pt-12 sm:pt-14 lg:pt-16">
      <NuxtLink :to="localePath('projects')" class="inline-flex items-center gap-2 text-sm text-muted"><Icon name="lucide:arrow-left" aria-hidden="true" />{{ t('actions.allProjects') }}</NuxtLink>
      <p class="eyebrow mt-9">{{ project.industry }}</p>
      <h1 class="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{{ project.title }}</h1>
      <p class="mt-5 max-w-3xl text-lg leading-8 text-muted md:text-xl">{{ project.summary }}</p>
      <a v-if="project.website" :href="project.website" target="_blank" rel="noreferrer" class="button-secondary mt-7 inline-flex"><Icon name="heroicons:arrow-up-right" class="button-icon" aria-hidden="true" />{{ t('actions.visitWebsite') }}</a>
    </header>

    <div v-reveal class="site-container">
      <NuxtImg :src="project.hero.src" :alt="project.hero.alt" :width="project.hero.width" :height="project.hero.height" class="aspect-[8/5] w-full rounded-3xl border border-line object-cover object-top" />
    </div>

    <section v-if="project.gallery?.length" class="site-container pt-8">
      <div class="grid gap-6 md:grid-cols-2">
        <figure v-for="(image, index) in project.gallery ?? []" :key="image.src" v-reveal="(index % 2) * 80" class="overflow-hidden rounded-2xl border border-line surface">
          <NuxtImg :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" class="aspect-video w-full object-cover object-top" loading="lazy" />
        </figure>
      </div>
    </section>

    <div class="site-container section-space grid gap-16 lg:grid-cols-[1fr_2fr]">
      <aside v-reveal>
        <p class="eyebrow">{{ t('projects.capabilities') }}</p>
        <ul class="mt-5 grid gap-2 text-sm text-muted"><li v-for="item in project.capabilities" :key="item">{{ item }}</li></ul>
      </aside>
      <div class="grid gap-14">
        <section v-reveal class="case-section"><p class="eyebrow">{{ t('projects.challenge') }}</p><p class="mt-4 text-xl leading-9">{{ project.challenge }}</p></section>
        <section v-reveal class="case-section"><p class="eyebrow">{{ t('projects.solution') }}</p><p class="mt-4 text-xl leading-9">{{ project.solution }}</p></section>
        <section v-reveal class="case-section"><p class="eyebrow">{{ t('projects.architecture') }}</p><p class="mt-4 text-xl leading-9">{{ project.architecture }}</p></section>
        <section v-reveal class="case-section">
          <p class="eyebrow">{{ t('projects.results') }}</p>
          <ul class="mt-5 divide-y divide-[color:var(--line)] border-y border-line"><li v-for="result in project.results" :key="result" class="result-row flex gap-3 py-4"><Icon name="lucide:check" class="mt-1 text-accent-500" aria-hidden="true" />{{ result }}</li></ul>
        </section>
        <section v-reveal class="case-section">
          <p class="eyebrow">{{ t('projects.stack') }}</p>
          <dl class="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-[color:var(--line)] sm:grid-cols-2">
            <div v-for="tool in project.stack" :key="tool.name" class="stack-tile surface p-5">
              <div class="flex items-center gap-3">
                <img v-if="technologyLogos[tool.name]" :src="technologyLogos[tool.name]?.src" alt="" width="28" height="28" class="size-7 object-contain">
                <dt class="font-semibold">{{ tool.name }}</dt>
              </div>
              <dd class="mt-2 text-sm text-muted">{{ tool.role }}</dd>
            </div>
          </dl>
        </section>
        <ContentRenderer :value="project" class="prose text-muted" />
      </div>
    </div>
  </article>
</template>
