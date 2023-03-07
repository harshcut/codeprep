'use client'

import * as React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { GripHorizontal, Keyboard, Play } from 'lucide-react'
import { Button, Tabs, Textarea, Select, Dialog, Label, Input } from 'ui'

export default function Editor() {
  const [optionOpen, setOptionOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')
  const [fontSize, setFontSize] = React.useState(14)

  return (
    <PanelGroup direction="vertical" className="max-w-6xl h-full mx-auto">
      <Panel minSize={50} className="rounded-lg rounded-t-none border border-slate-300 border-t-0">
        <CodeMirror
          extensions={[cpp()]}
          theme={theme}
          height="100%"
          style={{ height: '100%', fontSize }}
        />
      </Panel>
      <PanelResizeHandle className="flex justify-center border border-slate-300 border-b-0 rounded-lg rounded-b-none">
        <GripHorizontal className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel
        defaultSize={30}
        minSize={21}
        collapsible
        className="[&>*]:h-full border border-slate-300 border-t-0"
      >
        <Tabs defaultValue="input">
          <menu className="px-6 h-16 flex justify-between items-center">
            <Tabs.List>
              <Tabs.Trigger value="input">Stdin Input</Tabs.Trigger>
              <Tabs.Trigger value="output">Output</Tabs.Trigger>
            </Tabs.List>
            <div className="flex gap-4">
              <Dialog open={optionOpen} onOpenChange={setOptionOpen}>
                <Dialog.Trigger asChild>
                  <Button variant="outline" className="border-slate-300">
                    <Keyboard className="mr-2 h-4 w-4" /> Editor options
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content className="sm:max-w-[425px]">
                  <Dialog.Header>
                    <Dialog.Title>Editor options</Dialog.Title>
                    <Dialog.Description>
                      Make changes to your editor here. Close when you&apos;re done.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div className="grid gap-4 py-0">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="whitespace-nowrap">Theme</Label>
                      <Select
                        defaultValue={theme}
                        onValueChange={(t: 'light' | 'dark') => setTheme(t)}
                      >
                        <Select.Trigger className="col-span-3">
                          <Select.Value placeholder="Theme" />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="light">Light</Select.Item>
                          <Select.Item value="dark">Dark</Select.Item>
                        </Select.Content>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="whitespace-nowrap">Font Size</Label>
                      <Input
                        defaultValue={fontSize}
                        className="col-span-3"
                        type="number"
                        min={12}
                        max={24}
                        onChange={(s) => setFontSize(s.target.valueAsNumber)}
                      />
                    </div>
                  </div>
                  <Dialog.Footer>
                    <Button onClick={() => setOptionOpen(false)}>Close</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog>
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
