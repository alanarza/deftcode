<script setup lang="ts">
defineProps<{
  title: string
  labels: string[]
  status: string
}>()
</script>

<template>
  <div class="flow-visual" aria-hidden="true">
    <div class="flow-grid" />
    <div class="flow-heading"><span />{{ title }}</div>
    <div class="flow-line"><span /></div>

    <div v-for="(label, index) in labels" :key="label" class="flow-module" :class="`module-${index + 1}`">
      <span class="module-number">0{{ index + 1 }}</span>
      <strong>{{ label }}</strong>
      <span class="module-track"><i /></span>
    </div>

    <div class="flow-status"><span />{{ status }}</div>
  </div>
</template>

<style scoped>
.flow-visual { position: relative; width: min(100%, 32rem); aspect-ratio: 1.08; margin-inline: auto; overflow: hidden; border: 1px solid var(--line); border-radius: 2rem; background: color-mix(in srgb, var(--surface) 72%, transparent); box-shadow: var(--shadow); isolation: isolate; }
.flow-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--line) 1px, transparent 1px); background-size: 1.4rem 1.4rem; opacity: .34; -webkit-mask-image: linear-gradient(to bottom, black, transparent 92%); mask-image: linear-gradient(to bottom, black, transparent 92%); }
.flow-heading, .flow-status { position: absolute; z-index: 2; display: flex; align-items: center; gap: .55rem; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); font-family: var(--font-mono); font-size: .6rem; letter-spacing: .1em; text-transform: uppercase; }
.flow-heading { top: 1.25rem; left: 1.25rem; padding: .55rem .8rem; }
.flow-status { right: 1.25rem; bottom: 1.15rem; padding: .55rem .8rem; }
.flow-heading span, .flow-status span { width: .45rem; aspect-ratio: 1; border-radius: 50%; background: var(--color-accent-500); box-shadow: 0 0 .8rem var(--color-accent-500); }
.flow-line { position: absolute; top: 18%; bottom: 18%; left: 50%; width: 1px; overflow: hidden; background: var(--line); }
.flow-line span { display: block; width: 100%; height: 28%; background: linear-gradient(transparent, var(--color-accent-500), transparent); animation: flow-scan 3.5s ease-in-out infinite; }
.flow-module { position: absolute; z-index: 1; display: grid; width: 62%; gap: .6rem; border: 1px solid color-mix(in srgb, var(--color-accent-500) 22%, var(--line)); border-radius: 1.2rem; padding: 1rem 1.1rem; background: color-mix(in srgb, var(--surface) 94%, transparent); box-shadow: 0 16px 35px rgb(0 0 0 / 10%); animation: module-float 6s ease-in-out infinite; }
.module-1 { top: 20%; left: 9%; transform: rotate(-2deg); }
.module-2 { top: 43%; right: 8%; transform: rotate(1.5deg); animation-delay: -2s; }
.module-3 { bottom: 13%; left: 13%; transform: rotate(-1deg); animation-delay: -4s; }
.module-number { font-family: var(--font-mono); font-size: .62rem; color: var(--color-accent-500); }
.flow-module strong { font-size: .9rem; }
.module-track { position: relative; display: block; height: 2px; overflow: hidden; border-radius: 999px; background: var(--line); }
.module-track i { position: absolute; inset-block: 0; left: 0; width: 42%; border-radius: inherit; background: var(--color-accent-500); animation: track-pulse 3s ease-in-out infinite; }
@keyframes flow-scan { from { transform: translateY(-100%); } to { transform: translateY(360%); } }
@keyframes module-float { 50% { margin-top: -.5rem; } }
@keyframes track-pulse { 50% { width: 78%; opacity: .68; } }
@media (max-width: 31rem) { .flow-module { width: 72%; } .flow-status { display: none; } }
</style>
