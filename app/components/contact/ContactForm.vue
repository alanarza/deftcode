<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()
const appConfig = useAppConfig()
const state = reactive({ name: '', email: '', company: '', message: '', website: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  if (state.website) return
  status.value = 'sending'

  try {
    if (config.public.contactEndpoint) {
      await $fetch(config.public.contactEndpoint, { method: 'POST', body: state })
      status.value = 'success'
      return
    }

    const subject = encodeURIComponent(`Consulta de ${state.name}${state.company ? ` — ${state.company}` : ''}`)
    const body = encodeURIComponent(`${state.message}\n\n${state.name}\n${state.email}`)
    window.location.href = `mailto:${appConfig.brand.email}?subject=${subject}&body=${body}`
    status.value = 'success'
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="grid gap-5" @submit.prevent="submit">
    <div class="grid gap-5 sm:grid-cols-2">
      <label class="grid gap-2 text-sm font-medium">{{ t('contact.name') }}<input v-model="state.name" required autocomplete="name" class="surface rounded-xl border border-line px-4 py-3"></label>
      <label class="grid gap-2 text-sm font-medium">{{ t('contact.email') }}<input v-model="state.email" required type="email" autocomplete="email" class="surface rounded-xl border border-line px-4 py-3"></label>
    </div>
    <label class="grid gap-2 text-sm font-medium">{{ t('contact.company') }}<input v-model="state.company" autocomplete="organization" class="surface rounded-xl border border-line px-4 py-3"></label>
    <label class="grid gap-2 text-sm font-medium">{{ t('contact.message') }}<textarea v-model="state.message" required rows="6" class="surface resize-y rounded-xl border border-line px-4 py-3" /></label>
    <label class="hidden" aria-hidden="true">Website<input v-model="state.website" tabindex="-1" autocomplete="off"></label>
    <div class="flex flex-wrap items-center gap-4">
      <button type="submit" class="button-primary inline-flex" :disabled="status === 'sending'"><Icon name="heroicons:paper-airplane" class="button-icon" aria-hidden="true" />{{ status === 'sending' ? t('contact.sending') : t('contact.send') }}</button>
      <p v-if="status === 'success'" role="status" class="text-sm">{{ t('contact.success') }}</p>
      <p v-if="status === 'error'" role="alert" class="text-sm text-red-600">{{ t('contact.error') }}</p>
    </div>
  </form>
</template>
