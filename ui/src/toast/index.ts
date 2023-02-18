import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from './toast'

type ToastComponentType = typeof Toast & {
  Provider: typeof ToastProvider
  Viewport: typeof ToastViewport
  Title: typeof ToastTitle
  Description: typeof ToastDescription
  Close: typeof ToastClose
  Action: typeof ToastAction
}
;(Toast as ToastComponentType).Provider = ToastProvider
;(Toast as ToastComponentType).Viewport = ToastViewport
;(Toast as ToastComponentType).Title = ToastTitle
;(Toast as ToastComponentType).Description = ToastDescription
;(Toast as ToastComponentType).Close = ToastClose
;(Toast as ToastComponentType).Action = ToastAction

export { useToast } from './use-toast'
export default Toast as ToastComponentType
