'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { GripHorizontal, Play } from 'lucide-react'
import { Button, Tabs, Textarea, Select } from 'ui'

export default function Editor() {
  return (
    <PanelGroup direction="vertical" className="max-w-6xl h-full mx-auto">
      <Panel minSize={50} className="bg-purple-200 rounded-lg rounded-t-none" />
      <PanelResizeHandle className="flex justify-center border border-b-0 rounded-lg rounded-b-none">
        <GripHorizontal className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel
        defaultSize={30}
        minSize={21}
        collapsible
        className="[&>*]:h-full border border-slate-200 border-t-0"
      >
        <Tabs defaultValue="input">
          <menu className="px-6 h-16 flex justify-between items-center">
            <Tabs.List>
              <Tabs.Trigger value="input">Stdin Input</Tabs.Trigger>
              <Tabs.Trigger value="output">Output</Tabs.Trigger>
            </Tabs.List>
            <div className="flex gap-4">
              <Select>
                <Select.Trigger className="w-[180px]">
                  <Select.Value placeholder="Select language" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="java">Java</Select.Item>
                  <Select.Item value="python2">Python 2</Select.Item>
                  <Select.Item value="python3">Python 3</Select.Item>
                  <Select.Item value="c">C</Select.Item>
                  <Select.Item value="cpp14">C++ 14</Select.Item>
                  <Select.Item value="cpp17">C++ 17</Select.Item>
                  <Select.Item value="rust">Rust</Select.Item>
                </Select.Content>
              </Select>
              <Button className="w-24 bg-green-600 hover:bg-green-700">
                <Play className="mr-2 h-4 w-4" />
                Run
              </Button>
            </div>
          </menu>
          <Tabs.Content value="input" className="border-none m-0 pt-4 pb-[88px] h-full">
            <Textarea placeholder="stdin input..." className="resize-none h-full" />
          </Tabs.Content>
          <Tabs.Content value="output" className="border-none m-0 pt-4 pb-[88px] h-full">
            <Textarea placeholder="readonly output..." className="resize-none h-full" readOnly />
          </Tabs.Content>
        </Tabs>
      </Panel>
    </PanelGroup>
  )
}
