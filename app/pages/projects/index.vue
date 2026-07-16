<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'

const { t } = useI18n()
const { data: projects } = await useProjects()

useSeoMeta({ title: () => t('projects.title'), description: () => t('projects.description') })
</script>

<template>
  <div class="site-container section-space">
    <SharedSectionHeader as="h1" :eyebrow="t('projects.eyebrow')" :title="t('projects.title')" :description="t('projects.description')" />
    <div class="mt-20 grid gap-x-8 gap-y-20 lg:grid-cols-2">
      <ProjectCard v-for="(project, index) in projects" :key="project.id" v-reveal="(index % 2) * 80" :project="project" />
    </div>
  </div>
</template>
