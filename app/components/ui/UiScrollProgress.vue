<script setup lang="ts">
const progress = useTemplateRef<HTMLElement>('progress')
let animationFrame: number | undefined

function updateProgress() {
  animationFrame = undefined
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  const value = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0
  progress.value?.style.setProperty('--scroll-progress', String(value))
}

function scheduleUpdate() {
  if (animationFrame === undefined) animationFrame = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', scheduleUpdate, { passive: true })
  window.addEventListener('resize', scheduleUpdate, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleUpdate)
  window.removeEventListener('resize', scheduleUpdate)
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div ref="progress" class="scroll-progress" aria-hidden="true" />
</template>

<style scoped>
.scroll-progress {
  --scroll-progress: 0;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 70;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent-400), var(--color-accent-600));
  box-shadow: 0 0 .8rem color-mix(in srgb, var(--color-accent-400) 55%, transparent);
  pointer-events: none;
  transform: scaleX(var(--scroll-progress));
  transform-origin: left;
  will-change: transform;
}
</style>
