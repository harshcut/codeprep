import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './command'

type CommandComponentType = typeof Command & {
  Dialog: typeof CommandDialog
  Input: typeof CommandInput
  List: typeof CommandList
  Empty: typeof CommandEmpty
  Group: typeof CommandGroup
  Item: typeof CommandItem
  Shortcut: typeof CommandShortcut
  Separator: typeof CommandSeparator
}
;(Command as CommandComponentType).Dialog = CommandDialog
;(Command as CommandComponentType).Input = CommandInput
;(Command as CommandComponentType).List = CommandList
;(Command as CommandComponentType).Empty = CommandEmpty
;(Command as CommandComponentType).Group = CommandGroup
;(Command as CommandComponentType).Item = CommandItem
;(Command as CommandComponentType).Shortcut = CommandShortcut
;(Command as CommandComponentType).Separator = CommandSeparator

export default Command as CommandComponentType
