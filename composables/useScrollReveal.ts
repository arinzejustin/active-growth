import { onMounted, onBeforeUnmount } from 'vue'

export const useScrollReveal = () => {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal, [data-reveal]')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    elements.forEach((element) => {
      observer?.observe(element)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
