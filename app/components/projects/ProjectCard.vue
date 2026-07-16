<script setup lang="ts">
const props = defineProps<{
  project: { slug: string, title: string, summary: string, industry: string, hero: { src: string, alt: string } }
}>()
const { t } = useI18n()
const localePath = useLocalePath()
const projectUrl = computed(() => localePath({ name: 'projects-slug', params: { slug: props.project.slug } }))
</script>

<template>
  <article class="project-card group">
    <NuxtLink :to="projectUrl" class="project-media block overflow-hidden rounded-[1.75rem] border border-line surface" :aria-label="`${t('actions.viewProject')}: ${project.title}`">
      <NuxtImg :src="project.hero.src" :alt="project.hero.alt" width="1600" height="1000" class="aspect-[8/5] w-full object-cover transition duration-500 group-hover:scale-[1.015]" />
    </NuxtLink>
    <div class="mt-5 flex items-start justify-between gap-5">
      <div>
        <p class="eyebrow">{{ project.industry }}</p>
        <h3 class="mt-2 text-2xl font-semibold tracking-tight">{{ project.title }}</h3>
        <p class="mt-2 max-w-xl leading-7 text-muted">{{ project.summary }}</p>
      </div>
      <NuxtLink :to="projectUrl" class="project-arrow mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-line" :aria-label="`${t('actions.viewProject')}: ${project.title}`">
        <Icon name="heroicons:arrow-up-right" aria-hidden="true" />
      </NuxtLink>
    </div>
  </article>
</template>
