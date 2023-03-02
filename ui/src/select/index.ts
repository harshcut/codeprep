import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './select'

type SelectComponentType = typeof Select & {
  Group: typeof SelectGroup
  Value: typeof SelectValue
  Trigger: typeof SelectTrigger
  Content: typeof SelectContent
  Label: typeof SelectLabel
  Item: typeof SelectItem
  Separator: typeof SelectSeparator
}
;(Select as SelectComponentType).Group = SelectGroup
;(Select as SelectComponentType).Value = SelectValue
;(Select as SelectComponentType).Trigger = SelectTrigger
;(Select as SelectComponentType).Content = SelectContent
;(Select as SelectComponentType).Label = SelectLabel
;(Select as SelectComponentType).Item = SelectItem
;(Select as SelectComponentType).Separator = SelectSeparator

export default Select as SelectComponentType
