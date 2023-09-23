import { QNotifyCreateOptions, useQuasar } from 'quasar'

export type NotifyInput = Pick<
  QNotifyCreateOptions,
  | 'iconColor'
  | 'icon'
  | 'type'
  | 'message'
  | 'caption'
  | 'progress'
  | 'spinner'
  | 'multiLine'
  | 'timeout'
>

export const useNotify = () => {
  const q = useQuasar()

  const notify = (input: NotifyInput) => {
    q.notify({
      timeout: 4000,
      position: 'bottom-right',
      ...input,
    })
  }

  return { notify }
}
