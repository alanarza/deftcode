export function useSiteContent() {
  const { locale } = useI18n()

  return useAsyncData(
    computed(() => `site-content:${locale.value}`),
    () => locale.value === 'en'
      ? queryCollection('siteEn').first()
      : queryCollection('siteEs').first(),
    { watch: [locale] },
  )
}
