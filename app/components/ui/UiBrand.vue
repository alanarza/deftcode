<template>
  <span class="brand-identity">
    <span class="brand-mark" aria-hidden="true">
      <img src="/images/brand/deftcode-logo-transparent.png" alt="">
    </span>
    <span class="brand-word" aria-hidden="true"><span>deft</span><span class="brand-code">code</span></span>
    <span class="sr-only">deftcode</span>
  </span>
</template>

<style scoped>
.brand-identity { display: inline-flex; align-items: center; gap: .65rem; }
.brand-mark { position: relative; width: 2.5rem; flex: 0 0 auto; aspect-ratio: 1; overflow: hidden; border-radius: .5rem; }
.brand-mark img { position: absolute; top: -.95rem; left: -.95rem; width: 14.875rem; max-width: none; filter: drop-shadow(0 0 .6rem rgb(82 88 255 / 22%)); }
.brand-word { font-size: 1.25rem; font-weight: 580; letter-spacing: -.045em; line-height: 1; }
.brand-code { color: #5963ff; }

@media (max-width: 47.999rem) {
  .brand-identity { gap: .55rem; }
  .brand-mark { width: 2.25rem; }
  .brand-mark img { top: -.86rem; left: -.86rem; width: 13.4rem; }
  .brand-word { font-size: 1.1rem; }
}
</style>
