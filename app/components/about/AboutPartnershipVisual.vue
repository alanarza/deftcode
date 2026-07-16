<script setup lang="ts">
defineProps<{
  core: string
  labels: string[]
  status: string
}>()
</script>

<template>
  <div class="partnership-visual" aria-hidden="true">
    <div class="partnership-grid" />
    <div class="orbit orbit-outer"><span class="orbit-signal" /></div>
    <div class="orbit orbit-inner" />

    <div class="partnership-core">
      <span class="core-mark" />
      <span>{{ core }}</span>
    </div>

    <div v-for="(label, index) in labels" :key="label" class="partnership-node" :class="`node-${index + 1}`">
      <span class="node-index">0{{ index + 1 }}</span>
      <span>{{ label }}</span>
    </div>

    <div class="partnership-status"><span />{{ status }}</div>
  </div>
</template>

<style scoped>
.partnership-visual { position: relative; width: min(100%, 31rem); aspect-ratio: 1; margin-inline: auto; overflow: hidden; border: 1px solid var(--line); border-radius: 2rem; background: color-mix(in srgb, var(--surface) 72%, transparent); box-shadow: var(--shadow); isolation: isolate; }
.partnership-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 3rem 3rem; opacity: .22; -webkit-mask-image: radial-gradient(circle, black, transparent 72%); mask-image: radial-gradient(circle, black, transparent 72%); }
.orbit { position: absolute; top: 50%; left: 50%; border: 1px solid color-mix(in srgb, var(--color-accent-500) 45%, var(--line)); border-radius: 50%; transform: translate(-50%, -50%); }
.orbit-outer { width: 76%; aspect-ratio: 1; animation: orbit-spin 18s linear infinite; }
.orbit-inner { width: 48%; aspect-ratio: 1; border-style: dashed; opacity: .72; animation: orbit-spin-reverse 14s linear infinite; }
.orbit-signal { position: absolute; top: 50%; left: -.35rem; width: .65rem; aspect-ratio: 1; border-radius: 50%; background: var(--color-accent-500); box-shadow: 0 0 0 .35rem var(--accent-soft), 0 0 1.5rem var(--color-accent-500); }
.partnership-core { position: absolute; top: 50%; left: 50%; display: grid; width: 8rem; aspect-ratio: 1; place-content: center; gap: .65rem; border: 1px solid color-mix(in srgb, var(--color-accent-500) 45%, var(--line)); border-radius: 50%; background: var(--surface); font-size: .76rem; font-weight: 700; letter-spacing: .12em; text-align: center; text-transform: uppercase; transform: translate(-50%, -50%); box-shadow: 0 0 3rem color-mix(in srgb, var(--color-accent-500) 16%, transparent); }
.core-mark { width: .8rem; aspect-ratio: 1; margin-inline: auto; border-radius: 50%; background: var(--color-accent-500); box-shadow: 0 0 0 .35rem var(--accent-soft); animation: core-pulse 2.8s ease-in-out infinite; }
.partnership-node { position: absolute; display: grid; min-width: 7.75rem; gap: .25rem; border: 1px solid var(--line); border-radius: 1rem; padding: .8rem 1rem; background: color-mix(in srgb, var(--surface) 92%, transparent); box-shadow: 0 12px 32px rgb(0 0 0 / 10%); font-size: .78rem; font-weight: 650; animation: node-float 5s ease-in-out infinite; }
.node-index { font-family: var(--font-mono); font-size: .62rem; color: var(--color-accent-500); }
.node-1 { top: 10%; left: 50%; transform: translateX(-50%); }
.node-2 { right: 6%; bottom: 18%; animation-delay: -1.6s; }
.node-3 { bottom: 18%; left: 6%; animation-delay: -3.2s; }
.partnership-status { position: absolute; right: 1.25rem; bottom: 1.15rem; display: flex; align-items: center; gap: .55rem; border: 1px solid var(--line); border-radius: 999px; padding: .55rem .8rem; background: var(--surface); font-family: var(--font-mono); font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; }
.partnership-status span { width: .45rem; aspect-ratio: 1; border-radius: 50%; background: var(--color-accent-500); box-shadow: 0 0 .8rem var(--color-accent-500); }
@keyframes orbit-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes orbit-spin-reverse { to { transform: translate(-50%, -50%) rotate(-360deg); } }
@keyframes core-pulse { 50% { transform: scale(1.18); } }
@keyframes node-float { 50% { margin-top: -.45rem; } }
@media (max-width: 31rem) { .partnership-node { min-width: 6.3rem; padding: .65rem .75rem; font-size: .68rem; } .partnership-core { width: 6.6rem; } .partnership-status { display: none; } }
</style>
