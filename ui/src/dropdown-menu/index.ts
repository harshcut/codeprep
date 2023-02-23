import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu'

type DropdownMenuComponentType = typeof DropdownMenu & {
  Trigger: typeof DropdownMenuTrigger
  Content: typeof DropdownMenuContent
  Item: typeof DropdownMenuItem
  CheckboxItem: typeof DropdownMenuCheckboxItem
  RadioItem: typeof DropdownMenuRadioItem
  Label: typeof DropdownMenuLabel
  Separator: typeof DropdownMenuSeparator
  Shortcut: typeof DropdownMenuShortcut
  Group: typeof DropdownMenuGroup
  Portal: typeof DropdownMenuPortal
  Sub: typeof DropdownMenuSub
  SubContent: typeof DropdownMenuSubContent
  SubTrigger: typeof DropdownMenuSubTrigger
  RadioGroup: typeof DropdownMenuRadioGroup
}
;(DropdownMenu as DropdownMenuComponentType).Trigger = DropdownMenuTrigger
;(DropdownMenu as DropdownMenuComponentType).Content = DropdownMenuContent
;(DropdownMenu as DropdownMenuComponentType).Item = DropdownMenuItem
;(DropdownMenu as DropdownMenuComponentType).CheckboxItem = DropdownMenuCheckboxItem
;(DropdownMenu as DropdownMenuComponentType).RadioItem = DropdownMenuRadioItem
;(DropdownMenu as DropdownMenuComponentType).Label = DropdownMenuLabel
;(DropdownMenu as DropdownMenuComponentType).Separator = DropdownMenuSeparator
;(DropdownMenu as DropdownMenuComponentType).Shortcut = DropdownMenuShortcut
;(DropdownMenu as DropdownMenuComponentType).Group = DropdownMenuGroup
;(DropdownMenu as DropdownMenuComponentType).Portal = DropdownMenuPortal
;(DropdownMenu as DropdownMenuComponentType).Sub = DropdownMenuSub
;(DropdownMenu as DropdownMenuComponentType).SubContent = DropdownMenuSubContent
;(DropdownMenu as DropdownMenuComponentType).SubTrigger = DropdownMenuSubTrigger
;(DropdownMenu as DropdownMenuComponentType).RadioGroup = DropdownMenuRadioGroup

export default DropdownMenu as DropdownMenuComponentType
