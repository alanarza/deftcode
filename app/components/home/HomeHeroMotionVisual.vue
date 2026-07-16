<script setup lang="ts">
const { t } = useI18n()
const visual = useTemplateRef<HTMLElement>('visual')

const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }
let animationFrame: number | undefined

function renderPointer() {
  const element = visual.value
  if (!element) return

  current.x += (target.x - current.x) * 0.09
  current.y += (target.y - current.y) * 0.09

  element.style.setProperty('--rotate-x', `${current.y * -7}deg`)
  element.style.setProperty('--rotate-y', `${current.x * 9}deg`)
  element.style.setProperty('--glow-x', `${(current.x + 0.5) * 100}%`)
  element.style.setProperty('--glow-y', `${(current.y + 0.5) * 100}%`)

  if (Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001) {
    animationFrame = requestAnimationFrame(renderPointer)
  }
  else {
    animationFrame = undefined
  }
}

function scheduleRender() {
  if (animationFrame === undefined) animationFrame = requestAnimationFrame(renderPointer)
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch' || !visual.value) return

  const bounds = visual.value.getBoundingClientRect()
  target.x = (event.clientX - bounds.left) / bounds.width - 0.5
  target.y = (event.clientY - bounds.top) / bounds.height - 0.5
  scheduleRender()
}

function resetPointer() {
  target.x = 0
  target.y = 0
  scheduleRender()
}

onBeforeUnmount(() => {
  if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <div
    ref="visual"
    class="motion-visual"
    aria-hidden="true"
    @pointermove="handlePointerMove"
    @pointerleave="resetPointer"
  >
    <div class="visual-grid" />
    <div class="visual-orbit visual-orbit-one" />
    <div class="visual-orbit visual-orbit-two" />

    <div class="motion-scene">
      <div class="motion-layer layer-integration">
        <div class="motion-card card-integration">
          <header class="card-header">
            <span class="card-label"><Icon name="lucide:waypoints" />{{ t('heroVisual.integration') }}</span>
            <span class="card-index">03</span>
          </header>
          <div class="integration-map">
            <span class="map-node map-node-main"><Icon name="lucide:braces" /></span>
            <span class="map-line map-line-one" />
            <span class="map-line map-line-two" />
            <span class="map-node map-node-top" />
            <span class="map-node map-node-bottom" />
          </div>
        </div>
      </div>

      <div class="motion-layer layer-platform">
        <div class="motion-card card-platform">
          <header class="card-header">
            <span class="card-label"><Icon name="lucide:panels-top-left" />{{ t('heroVisual.platform') }}</span>
            <span class="card-index">02</span>
          </header>
          <div class="platform-layout">
            <span class="platform-sidebar" />
            <span class="platform-block platform-block-one" />
            <span class="platform-block platform-block-two" />
            <span class="platform-block platform-block-three" />
          </div>
        </div>
      </div>

      <div class="motion-layer layer-product">
        <div class="motion-card card-product">
          <header class="card-header">
            <span class="card-label"><Icon name="lucide:box" />{{ t('heroVisual.product') }}</span>
            <span class="card-index">01</span>
          </header>
          <div class="product-flow">
            <span class="flow-step is-active"><Icon name="lucide:check" /></span>
            <span class="flow-connector" />
            <span class="flow-step" />
            <span class="flow-connector" />
            <span class="flow-step" />
          </div>
          <div class="product-lines"><span /><span /><span /></div>
        </div>
      </div>
    </div>

    <div class="visual-status">
      <span class="status-pulse" />
      {{ t('heroVisual.status') }}
    </div>
  </div>
</template>

<style scoped>
.motion-visual {
  --glow-x: 50%;
  --glow-y: 50%;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  position: relative;
  isolation: isolate;
  width: min(100%, 35rem);
  aspect-ratio: 1 / 1.02;
  margin-inline: auto;
  perspective: 1100px;
  user-select: none;
}

.motion-visual::before {
  position: absolute;
  inset: 7%;
  z-index: -2;
  border-radius: 50%;
  background: radial-gradient(circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--color-accent-400) 28%, transparent), transparent 62%);
  filter: blur(18px);
  content: "";
  transition: background-position .2s ease;
}

.visual-grid {
  position: absolute;
  inset: 5%;
  z-index: -1;
  border-radius: 50%;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--muted) 42%, transparent) 1px, transparent 1px);
  background-size: 1.3rem 1.3rem;
  opacity: .44;
  -webkit-mask-image: radial-gradient(circle, black 18%, transparent 70%);
  mask-image: radial-gradient(circle, black 18%, transparent 70%);
}

.visual-orbit {
  position: absolute;
  z-index: -1;
  border: 1px solid color-mix(in srgb, var(--color-accent-500) 22%, transparent);
  border-radius: 50%;
  animation: orbit-spin 24s linear infinite;
}

.visual-orbit::after {
  position: absolute;
  top: 13%;
  left: 13%;
  width: .55rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-accent-400);
  box-shadow: 0 0 1.2rem color-mix(in srgb, var(--color-accent-400) 65%, transparent);
  content: "";
}

.visual-orbit-one { inset: 7%; }
.visual-orbit-two { inset: 19%; animation-direction: reverse; animation-duration: 17s; opacity: .58; }

.motion-scene {
  position: absolute;
  inset: 12% 5% 11%;
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  transform-style: preserve-3d;
  transition: transform .12s linear;
}

.motion-layer { position: absolute; transform-style: preserve-3d; }
.layer-integration { top: 2%; right: 1%; width: 70%; transform: translateZ(-70px) rotate(4deg); }
.layer-platform { top: 30%; left: 0; width: 72%; transform: translateZ(-5px) rotate(-5deg); }
.layer-product { right: 5%; bottom: 1%; width: 73%; transform: translateZ(75px) rotate(2deg); }

.motion-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1.45 / 1;
  border: 1px solid color-mix(in srgb, var(--line) 86%, var(--color-accent-500));
  border-radius: 1.35rem;
  box-shadow: 0 1.4rem 3.5rem rgb(12 14 20 / 15%);
  animation: card-float 6s ease-in-out infinite;
  backface-visibility: hidden;
}

.motion-card::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 20%, rgb(255 255 255 / 15%) 46%, transparent 67%);
  content: "";
  transform: translateX(-120%);
  animation: card-shine 7s ease-in-out infinite;
}

.card-integration { background: color-mix(in srgb, var(--surface) 92%, var(--accent-soft)); animation-delay: -4s; }
.card-platform { background: color-mix(in srgb, var(--ink) 93%, var(--color-accent-500)); color: var(--page); animation-delay: -2s; }
.card-product { background: linear-gradient(145deg, var(--color-accent-400), var(--color-accent-600)); color: white; }

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.1rem;
  font-family: var(--font-mono);
  font-size: .62rem;
  font-weight: 650;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.card-label { display: inline-flex; align-items: center; gap: .45rem; }
.card-label :deep(svg) { width: .85rem; height: .85rem; }
.card-index { opacity: .6; }

.integration-map { position: absolute; inset: 35% 13% 16%; }
.map-node { position: absolute; display: grid; width: 1rem; aspect-ratio: 1; place-items: center; border: 1px solid var(--color-accent-400); border-radius: 50%; background: var(--surface); }
.map-node-main { top: 20%; left: 4%; width: 2.15rem; color: var(--color-accent-500); }
.map-node-top { top: 0; right: 3%; }
.map-node-bottom { right: 16%; bottom: 0; }
.map-line { position: absolute; left: 22%; height: 1px; background: linear-gradient(90deg, var(--color-accent-400), color-mix(in srgb, var(--color-accent-400) 15%, transparent)); transform-origin: left; }
.map-line-one { top: 29%; width: 67%; transform: rotate(-12deg); }
.map-line-two { top: 37%; width: 58%; transform: rotate(17deg); }

.platform-layout { position: absolute; inset: 36% 9% 13%; display: grid; grid-template-columns: 22% 1fr 1fr; grid-template-rows: 1fr 1fr; gap: .45rem; }
.platform-sidebar { grid-row: 1 / 3; border-radius: .55rem; background: color-mix(in srgb, var(--color-accent-400) 72%, transparent); }
.platform-block { border: 1px solid rgb(255 255 255 / 13%); border-radius: .5rem; background: rgb(255 255 255 / 8%); }
.platform-block-one { grid-column: 2 / 4; }

.product-flow { display: flex; align-items: center; padding: .5rem 1.15rem 0; }
.flow-step { display: grid; width: 1.35rem; aspect-ratio: 1; flex: 0 0 auto; place-items: center; border: 1px solid rgb(255 255 255 / 46%); border-radius: 50%; }
.flow-step :deep(svg) { width: .75rem; }
.flow-step.is-active { background: white; color: var(--color-accent-600); }
.flow-connector { height: 1px; flex: 1; background: rgb(255 255 255 / 38%); }
.product-lines { display: grid; gap: .36rem; padding: .8rem 1.15rem; }
.product-lines span { height: .23rem; border-radius: 999px; background: rgb(255 255 255 / 32%); }
.product-lines span:nth-child(1) { width: 76%; }
.product-lines span:nth-child(2) { width: 56%; }
.product-lines span:nth-child(3) { width: 66%; }

.visual-status {
  position: absolute;
  right: 4%;
  bottom: 4%;
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  padding: .5rem .7rem;
  box-shadow: var(--shadow);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: .58rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.status-pulse { width: .42rem; aspect-ratio: 1; border-radius: 50%; background: var(--color-accent-400); box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-accent-400) 55%, transparent); animation: status-pulse 2.2s ease-out infinite; }

@keyframes card-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -.55rem, 0); }
}

@keyframes card-shine {
  0%, 58% { transform: translateX(-120%); }
  78%, 100% { transform: translateX(130%); }
}

@keyframes orbit-spin { to { transform: rotate(360deg); } }

@keyframes status-pulse {
  70%, 100% { box-shadow: 0 0 0 .65rem transparent; }
}

@media (max-width: 63.999rem) {
  .motion-visual { width: min(100%, 28rem); margin-top: 2rem; }
}

@media (max-width: 39.999rem) {
  .motion-visual { width: min(100%, 21rem); }
  .motion-scene { inset-inline: 2%; }
  .visual-status { right: 1%; bottom: 1%; }
}

@media (prefers-reduced-motion: reduce) {
  .motion-scene { transform: none; transition: none; }
  .motion-card, .motion-card::after, .visual-orbit, .status-pulse { animation: none; }
}
</style>
