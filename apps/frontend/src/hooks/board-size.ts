import { useQuasar } from 'quasar'
import { computed } from 'vue'

export const useBoardSize = () => {
  const q = useQuasar()

  return computed(() => {
    let result = q.screen.width

    if (q.screen.gt.xs) {
      result = q.screen.width - 65
    }

    if (q.screen.gt.sm) {
      result = q.screen.sizes.sm
    }

    if (q.screen.gt.md) {
      result = q.screen.sizes.md - 265
    }

    if (q.screen.gt.lg) {
      result = q.screen.sizes.lg - 265
    }

    return Math.min(result, q.screen.height)
  })
}
