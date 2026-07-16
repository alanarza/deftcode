import type { DirectiveBinding } from 'vue'

type RevealElement = HTMLElement & { _revealObserver?: IntersectionObserver }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    beforeMount(element: RevealElement, binding: DirectiveBinding<number | undefined>) {
      element.classList.add('reveal-item')
      if (binding.value) element.style.setProperty('--reveal-delay', `${binding.value}ms`)
    },
    mounted(element: RevealElement) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion || !('IntersectionObserver' in window)) {
        element.classList.add('is-revealed')
        return
      }

      element._revealObserver = new IntersectionObserver(([entry], observer) => {
        if (!entry?.isIntersecting) return
        element.classList.add('is-revealed')
        observer.unobserve(element)
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -7% 0px',
      })

      element._revealObserver.observe(element)
    },
    unmounted(element: RevealElement) {
      element._revealObserver?.disconnect()
    },
  })
})
