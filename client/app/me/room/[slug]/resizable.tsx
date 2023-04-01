'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { GripHorizontal, GripVertical, Keyboard, Loader2, Play, Reply } from 'lucide-react'
import { Button, Tabs, Textarea, Select, Dialog, Label, Input, Toast, useToast } from 'ui'
import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { WebsocketProvider } from 'y-websocket'
import { supabase, langData, cn } from '@/utils'
import { TwoSum, ValidAnagram } from '@/content'
import type { Extension } from '@codemirror/state'
import type { RealtimeChannel } from '@supabase/supabase-js'

interface ChatMessage {
  user?: string
  timestamp: Date | string
  message: string
}

export default function Resizable({ id }: { id: string }) {
  const { data: session } = useSession()
  const [loading, setLoading] = React.useState(false)
  const [script, setScript] = React.useState('')
  const [stdin, setStdin] = React.useState('')
  const [language, setLanguage] = React.useState<string>()
  const [stdout, setStdout] = React.useState('')
  const [optionOpen, setOptionOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')
  const [fontSize, setFontSize] = React.useState(14)
  const { setToast } = useToast()
  const [channel, setChannel] = React.useState<RealtimeChannel>()
  const [extensions, setExtensions] = React.useState<Extension[]>([cpp()])
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_YJS_WEBSOCKET_URL || 'ws://localhost:1234'
    const doc = new Y.Doc()
    const provider = new WebsocketProvider(wsUrl, id, doc)
    const text = doc.getText()
    const undoManager = new Y.UndoManager(text)
    provider.awareness.setLocalStateField('user', { name: session?.user?.email })
    setExtensions((prev) => [...prev, yCollab(text, provider.awareness, { undoManager })])

    return () => {
      provider.wsconnected && provider.destroy()
      doc.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const channel = supabase.channel(id, { config: { broadcast: { ack: true } } }).subscribe()
    setChannel(channel)
    channel.on('broadcast', { event: 'lang-update' }, ({ payload }) => {
      setToast({
        title: 'Language Updated on Remote',
        description: `A user has changed its compiler language to ${langData[payload]?.name}.`,
        action: (
          <Toast.Action altText="Update" onClick={() => setLanguage(payload)}>
            Update
          </Toast.Action>
        ),
      })
    })
    channel.on('broadcast', { event: 'text-chat' }, ({ payload }) => {
      setMessages((messages) => [...messages, payload])
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onCodeRun = React.useCallback(async () => {
    setLoading(true)
    const { data, error } = await fetch('/api/jdoodle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script, stdin, language }),
    }).then((res) => res.json())
    if (error) {
      setToast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}. Try again with correct parameters.`,
        variant: 'destructive',
      })
      return setLoading(false)
    }
    setStdout(data)
    return setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script, stdin, language])

  const onMessageSend = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const message = ev.currentTarget.message.value
    const timestamp = new Date()
    ev.currentTarget.reset()
    const payload = { user: session?.user?.email, timestamp, message }
    const response = await channel?.send({ type: 'broadcast', event: 'text-chat', payload })
    if (response !== 'ok') return
    setMessages((messages) => [...messages, { timestamp, message }])
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={21} minSize={21} collapsible>
        <Tabs defaultValue="1" className="h-full flex flex-col">
          <Tabs.List className="m-4">
            <Tabs.Trigger value="1" className="min-w-max">
              Q 1
            </Tabs.Trigger>
            <Tabs.Trigger value="2" className="min-w-max">
              Q 2
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="1" className="p-4 pt-0 m-0 border-none overflow-y-auto">
            <TwoSum />
          </Tabs.Content>
          <Tabs.Content value="2" className="p-4 pt-0 m-0 border-none overflow-y-auto">
            <ValidAnagram />
          </Tabs.Content>
        </Tabs>
      </Panel>
      <PanelResizeHandle className="flex items-center border-l border-slate-300">
        <GripVertical className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel minSize={50}>
        <PanelGroup direction="vertical">
          <Panel
            minSize={50}
            className="rounded-lg rounded-t-none border border-slate-300 border-t-0"
          >
            <CodeMirror
              extensions={extensions}
              theme={theme}
              height="100%"
              style={{ height: '100%', fontSize }}
              onChange={setScript}
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
                          Make changes to your editor here. Close when you&apos;re done. These
                          options are not synced.
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
                  <Select
                    value={language}
                    onValueChange={async (payload) => {
                      setLanguage(payload)
                      await channel?.send({ type: 'broadcast', event: 'lang-update', payload })
                    }}
                  >
                    <Select.Trigger className="w-[180px]">
                      <Select.Value placeholder="Select language" />
                    </Select.Trigger>
                    <Select.Content>
                      {Object.keys(langData).map((key, idx) => (
                        <Select.Item value={key} key={idx}>
                          {langData[key].name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select>
                  <Button
                    onClick={onCodeRun}
                    className="w-24 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    Run
                  </Button>
                </div>
              </menu>
              <Tabs.Content value="input" className="border-none m-0 pt-4 pb-[88px] h-full">
                <Textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="stdin input..."
                  className="resize-none h-full"
                />
              </Tabs.Content>
              <Tabs.Content value="output" className="border-none m-0 pt-4 pb-[88px] h-full">
                <Textarea
                  value={stdout}
                  placeholder="readonly output..."
                  readOnly
                  className="resize-none h-full"
                />
              </Tabs.Content>
            </Tabs>
          </Panel>
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="flex items-center">
        <GripVertical className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel defaultSize={21} minSize={21} collapsible>
        <PanelGroup direction="vertical">
          <Panel minSize={30} className="bg-red-200" />
          <PanelResizeHandle className="flex justify-center border border-slate-300 border-b-0 rounded-lg rounded-b-none">
            <GripHorizontal className="h-4 w-4" />
          </PanelResizeHandle>
          <Panel minSize={30} className="flex flex-col border-x border-slate-300">
            <div className="grow px-4 pt-2 overflow-y-auto">
              {messages.map(({ user, timestamp, message }, key) => (
                <article key={key} className={cn(!user && 'text-right', 'mb-4 break-words')}>
                  <small className="text-sm font-semibold leading-none">
                    <span>{user ?? 'You'}</span>
                    <span className="font-normal text-gray-500 mx-2">&bull;</span>
                    <time className="font-normal text-gray-500">
                      {new Date(timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </time>
                  </small>
                  <p className="text-sm leading-4 mt-1">{message}</p>
                </article>
              ))}
              <div ref={chatEndRef} className="h-[60px]" />
            </div>
            <form onSubmit={onMessageSend} className="flex p-4 gap-4 border-t border-slate-300">
              <Input name="message" required placeholder="Message" />
              <Button type="submit" title="Send">
                <Reply className="h-4 w-4" />
              </Button>
            </form>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
