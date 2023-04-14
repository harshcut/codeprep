import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog'

type AlertDialogComponentType = typeof AlertDialog & {
  Trigger: typeof AlertDialogTrigger
  Content: typeof AlertDialogContent
  Header: typeof AlertDialogHeader
  Footer: typeof AlertDialogFooter
  Title: typeof AlertDialogTitle
  Description: typeof AlertDialogDescription
  Action: typeof AlertDialogAction
  Cancel: typeof AlertDialogCancel
}
;(AlertDialog as AlertDialogComponentType).Trigger = AlertDialogTrigger
;(AlertDialog as AlertDialogComponentType).Content = AlertDialogContent
;(AlertDialog as AlertDialogComponentType).Header = AlertDialogHeader
;(AlertDialog as AlertDialogComponentType).Footer = AlertDialogFooter
;(AlertDialog as AlertDialogComponentType).Title = AlertDialogTitle
;(AlertDialog as AlertDialogComponentType).Description = AlertDialogDescription
;(AlertDialog as AlertDialogComponentType).Action = AlertDialogAction
;(AlertDialog as AlertDialogComponentType).Cancel = AlertDialogCancel

export default AlertDialog as AlertDialogComponentType
