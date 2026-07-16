<script setup lang="ts">
const localeHead = useLocaleHead()
const config = useRuntimeConfig()
const appConfig = useAppConfig()

onNuxtReady(() => {
  document.documentElement.dataset.appReady = 'true'
})

useSchemaOrg([
  defineOrganization({
    name: config.public.siteName,
    url: config.public.siteUrl,
    logo: `${config.public.siteUrl}/images/brand/deftcode-logo-transparent.png`,
    email: appConfig.brand.email,
    sameAs: appConfig.contactChannels.filter(channel => channel.type !== 'email').map(channel => channel.href),
  }),
])

useSeoMeta({
  ogImage: '/images/brand/deftcode-logo.png',
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
  titleTemplate: title => title ? `${title} · ${config.public.siteName}` : config.public.siteName,
}))
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
