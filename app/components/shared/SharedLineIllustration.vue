<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string
  tone?: number
  delay?: number
  compact?: boolean
  mini?: boolean
}>(), {
  tone: 0,
  delay: 0,
  compact: false,
  mini: false,
})

const illustrationStyle = computed(() => ({
  '--illustration-hue': String(225 + (props.tone % 6) * 27),
  '--illustration-delay': `${props.delay}ms`,
}))
</script>

<template>
  <div class="line-illustration" :class="{ 'is-compact': compact, 'is-mini': mini }" :style="illustrationStyle" aria-hidden="true">
    <svg class="illustration-circuit" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="31" />
      <path d="M10 40h10m40 0h10M40 10v10m0 40v10" />
      <path class="circuit-accent" d="M17 54c6 11 18 18 31 16" />
    </svg>
    <Icon :name="icon" class="illustration-icon" />
    <span class="illustration-dot dot-a" />
    <span class="illustration-dot dot-b" />
  </div>
</template>

<style scoped>
.line-illustration { --illustration-color: hsl(var(--illustration-hue) 88% 61%); position: relative; display: grid; width: 5.25rem; flex: 0 0 auto; aspect-ratio: 1; place-items: center; overflow: hidden; border: 1px solid color-mix(in srgb, var(--illustration-color) 34%, var(--line)); border-radius: 1.35rem; background: color-mix(in srgb, var(--surface) 90%, var(--illustration-color) 10%); box-shadow: inset 0 0 2rem color-mix(in srgb, var(--illustration-color) 8%, transparent); }
.line-illustration.is-compact { width: 4rem; border-radius: 1.05rem; }
.line-illustration.is-mini { width: 3.25rem; border-radius: .9rem; }
.illustration-circuit { position: absolute; inset: 0; width: 100%; height: 100%; stroke: color-mix(in srgb, var(--illustration-color) 42%, var(--line)); stroke-width: 1; stroke-linecap: round; stroke-dasharray: 6 8; opacity: .66; animation: circuit-spin 16s linear infinite; animation-delay: var(--illustration-delay); }
.circuit-accent { stroke: var(--illustration-color); stroke-width: 1.8; stroke-dasharray: 38; animation: circuit-draw 5.5s ease-in-out infinite; animation-delay: var(--illustration-delay); }
.illustration-icon { z-index: 1; width: 2rem; height: 2rem; color: var(--illustration-color); filter: drop-shadow(0 0 .65rem color-mix(in srgb, var(--illustration-color) 42%, transparent)); }
.is-compact .illustration-icon { width: 1.55rem; height: 1.55rem; }
.is-mini .illustration-icon { width: 1.3rem; height: 1.3rem; }
.illustration-icon :deep(path), .illustration-icon :deep(rect), .illustration-icon :deep(circle), .illustration-icon :deep(polyline), .illustration-icon :deep(line) { stroke-dasharray: 90; stroke-dashoffset: 0; animation: icon-trace 5.5s ease-in-out infinite; animation-delay: var(--illustration-delay); }
.illustration-dot { position: absolute; width: .34rem; aspect-ratio: 1; border-radius: 50%; background: var(--illustration-color); box-shadow: 0 0 .7rem var(--illustration-color); }
.dot-a { top: 13%; left: 47%; animation: dot-pulse 2.8s ease-in-out infinite; animation-delay: var(--illustration-delay); }
.dot-b { right: 13%; bottom: 24%; animation: dot-pulse 2.8s ease-in-out infinite reverse; animation-delay: calc(var(--illustration-delay) - 1.2s); }
@keyframes circuit-spin { to { transform: rotate(360deg); } }
@keyframes circuit-draw { 0%, 18% { stroke-dashoffset: 38; opacity: .25; } 50%, 78% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: -38; opacity: .25; } }
@keyframes icon-trace { 0%, 12% { stroke-dashoffset: 90; opacity: .3; } 42%, 78% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: -90; opacity: .3; } }
@keyframes dot-pulse { 50% { opacity: .3; transform: scale(.55); } }
@media (prefers-reduced-motion: reduce) { .illustration-circuit, .circuit-accent, .illustration-icon :deep(*), .illustration-dot { animation: none !important; stroke-dashoffset: 0 !important; } }
</style>
