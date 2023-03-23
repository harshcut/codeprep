'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { GripHorizontal, GripVertical } from 'lucide-react'
import * as Y from 'yjs'
import { yCollab } from 'y-codemirror.next'
import { WebsocketProvider } from 'y-websocket'
import type { Extension } from '@codemirror/state'

export default function Resizable({ id }: { id: string }) {
  const { data: session } = useSession()
  const [extensions, setExtensions] = React.useState<Extension[]>([cpp()])

  React.useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_YJS_WEBSOCKET_URL || 'ws://localhost:1234'
    const doc = new Y.Doc()
    var provider = new WebsocketProvider(wsUrl, id, doc)
    const text = doc.getText()
    const undoManager = new Y.UndoManager(text)
    provider.awareness.setLocalStateField('user', { name: session?.user?.email })
    setExtensions((prev) => [...prev, yCollab(text, provider.awareness, { undoManager })])

    return () => {
      provider.destroy()
      doc.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={21} minSize={21} collapsible className="bg-blue-200" />
      <PanelResizeHandle className="flex items-center">
        <GripVertical className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel minSize={50}>
        <PanelGroup direction="vertical">
          <Panel minSize={50} className="bg-teal-200">
            <CodeMirror
              extensions={extensions}
              theme="dark"
              height="100%"
              style={{ height: '100%' }}
            />
          </Panel>
          <PanelResizeHandle className="flex justify-center">
            <GripHorizontal className="h-4 w-4" />
          </PanelResizeHandle>
          <Panel defaultSize={30} minSize={21} collapsible className="bg-orange-200" />
        </PanelGroup>
      </Panel>
      <PanelResizeHandle className="flex items-center">
        <GripVertical className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel defaultSize={21} minSize={21} collapsible>
        <PanelGroup direction="vertical">
          <Panel minSize={30} className="bg-red-200" />
          <PanelResizeHandle className="flex justify-center">
            <GripHorizontal className="h-4 w-4" />
          </PanelResizeHandle>
          <Panel minSize={30} className="bg-purple-200" />
        </PanelGroup>
      </Panel>
    </PanelGroup>
  )
}
