import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

type DialogComponentType = typeof Dialog & {
  Trigger: typeof DialogTrigger
  Content: typeof DialogContent
  Header: typeof DialogHeader
  Footer: typeof DialogFooter
  Title: typeof DialogTitle
  Description: typeof DialogDescription
}
;(Dialog as DialogComponentType).Trigger = DialogTrigger
;(Dialog as DialogComponentType).Content = DialogContent
;(Dialog as DialogComponentType).Header = DialogHeader
;(Dialog as DialogComponentType).Footer = DialogFooter
;(Dialog as DialogComponentType).Title = DialogTitle
;(Dialog as DialogComponentType).Description = DialogDescription

export default Dialog as DialogComponentType
