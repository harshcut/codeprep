import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

type TabsComponentType = typeof Tabs & {
  List: typeof TabsList
  Trigger: typeof TabsTrigger
  Content: typeof TabsContent
}
;(Tabs as TabsComponentType).List = TabsList
;(Tabs as TabsComponentType).Trigger = TabsTrigger
;(Tabs as TabsComponentType).Content = TabsContent

export default Tabs as TabsComponentType
