export function useProjects(featuredOnly = false) {
  const { locale } = useI18n()

  return useAsyncData(
    computed(() => `projects:${locale.value}:${featuredOnly}`),
    async () => {
      const projects = locale.value === 'en'
        ? await queryCollection('projectsEn').order('order', 'ASC').all()
        : await queryCollection('projectsEs').order('order', 'ASC').all()

      return featuredOnly ? projects.filter(project => project.featured) : projects
    },
    { watch: [locale] },
  )
}

export function useProject(slug: MaybeRef<string>) {
  const { locale } = useI18n()

  return useAsyncData(
    computed(() => `project:${locale.value}:${toValue(slug)}`),
    () => locale.value === 'en'
      ? queryCollection('projectsEn').where('slug', '=', toValue(slug)).first()
      : queryCollection('projectsEs').where('slug', '=', toValue(slug)).first(),
    { watch: [locale, () => toValue(slug)] },
  )
}
