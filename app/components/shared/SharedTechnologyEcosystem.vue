<script setup lang="ts">
const { t } = useI18n()

const technologies = [
  { key: 'nuxt', name: 'Nuxt', image: '/images/technology/nuxt.svg' },
  { key: 'vue', name: 'Vue', image: '/images/technology/vue.svg' },
  { key: 'typescript', name: 'TypeScript', image: '/images/technology/typescript.svg' },
  { key: 'tailwind', name: 'Tailwind CSS', image: '/images/technology/tailwindcss.svg' },
  { key: 'laravel', name: 'Laravel', image: '/images/technology/laravel.svg' },
  { key: 'flutter', name: 'Flutter', image: '/images/technology/flutter.svg' },
  { key: 'node', name: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { key: 'vercel', name: 'Vercel', image: '/images/technology/vercel.svg', adaptive: true },
]
</script>

<template>
  <section id="technology" class="technology-shell">
    <div class="technology-grid-bg" />
    <div class="relative z-10">
      <p class="eyebrow">{{ t('technology.eyebrow') }}</p>
      <div class="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <h2 class="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{{ t('technology.title') }}</h2>
        <p class="max-w-xl leading-7 text-muted lg:justify-self-end">{{ t('technology.description') }}</p>
      </div>

      <div class="technology-grid mt-12">
        <article
          v-for="(technology, index) in technologies"
          :key="technology.key"
          v-reveal="(index % 4) * 55"
          class="technology-card"
          :style="{ '--technology-delay': `${index * -0.7}s` }"
        >
          <div class="technology-logo-wrap" :class="{ 'is-adaptive': technology.adaptive, 'is-node': technology.key === 'node' }">
            <img
              v-if="technology.image"
              :src="technology.image"
              alt=""
              width="44"
              height="44"
              loading="lazy"
              class="technology-logo"
              :class="{ 'is-adaptive': technology.adaptive }"
            >
            <Icon v-else :name="technology.icon ?? 'simple-icons:nodedotjs'" class="technology-logo technology-icon" aria-hidden="true" />
          </div>
          <div>
            <h3 class="font-semibold">{{ technology.name }}</h3>
            <p class="mt-1 text-xs leading-5 text-muted">{{ t(`technology.items.${technology.key}`) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technology-shell { position: relative; overflow: hidden; scroll-margin-top: 6rem; border: 1px solid var(--line); border-radius: 2rem; padding: clamp(1.5rem, 4vw, 3rem); background: color-mix(in srgb, var(--surface) 82%, transparent); box-shadow: var(--shadow); isolation: isolate; }
.technology-shell::before { position: absolute; top: -35%; right: -10%; width: 28rem; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--color-accent-500) 18%, transparent), transparent 68%); content: ''; filter: blur(8px); }
.technology-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 3rem 3rem; opacity: .16; -webkit-mask-image: linear-gradient(110deg, transparent, black, transparent); mask-image: linear-gradient(110deg, transparent, black, transparent); animation: technology-scan 12s linear infinite; }
.technology-grid { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.technology-card { display: flex; min-height: 9.5rem; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: .8rem; border: 1px solid var(--line); border-radius: 1.25rem; padding: 1rem; background: color-mix(in srgb, var(--surface) 94%, transparent); transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; animation: technology-breathe 7s ease-in-out infinite; animation-delay: var(--technology-delay); }
.technology-logo-wrap { display: grid; width: 3.75rem; flex: 0 0 auto; aspect-ratio: 1; place-items: center; border: 1px solid var(--line); border-radius: 1rem; background: var(--page); }
.technology-logo-wrap.is-adaptive { background: #fff; }
.technology-logo { width: 2.25rem; height: 2.25rem; object-fit: contain; }
.technology-icon { color: #5fa04e; }
@media (hover: hover) { .technology-card:hover { border-color: color-mix(in srgb, var(--color-accent-500) 40%, var(--line)); box-shadow: 0 16px 35px rgb(0 0 0 / 10%); transform: translateY(-4px); } }
@media (min-width: 48rem) { .technology-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
@media (min-width: 64rem) { .technology-grid { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
@keyframes technology-scan { from { transform: translateX(-18%); } to { transform: translateX(18%); } }
@keyframes technology-breathe { 50% { background: color-mix(in srgb, var(--surface) 88%, var(--accent-soft)); } }
</style>
