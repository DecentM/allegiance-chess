import * as Sentry from '@sentry/vue'
import { Notation } from '@decentm/allegiance-chess-core'

import BackwardSelection from '../assets/navigation_backward-selection-minimal.ogg'
import HoverTap from '../assets/navigation_hover-tap.ogg'
import NavigationCancel from '../assets/navigation-cancel.ogg'
import RefreshFeed from '../assets/ui_refresh-feed.ogg'
import Tap01 from '../assets/ui_tap-variant-01.ogg'

export const useBoardAudio = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const backwardSelectionAudio = new Audio(BackwardSelection)
  const hoverTapAudio = new Audio(HoverTap)
  const navigationCancelAudio = new Audio(NavigationCancel)
  const refreshFeedAudio = new Audio(RefreshFeed)
  const tap01Audio = new Audio(Tap01)

  const playNode = async (node: Partial<Notation.Node>) => {
    try {
      if (node.kind === 'game-over') {
        return await backwardSelectionAudio.play()
      }

      if (node.kind !== 'move') {
        return
      }

      switch (node.type) {
        default:
          return await tap01Audio.play()

        case 'capture':
        case 'en-passant':
          return await navigationCancelAudio.play()

        case 'allegiance':
          return await hoverTapAudio.play()

        case 'castle':
        case 'promotion':
          return await refreshFeedAudio.play()
      }
    } catch (error) {
      if (error instanceof Error) {
        Sentry.captureEvent({
          level: 'log',
          extra: { ...error },
          message: 'Cannot play audio',
          type: 'replay_event',
        })
      }
    }
  }

  return {
    playNode,
  }
}
