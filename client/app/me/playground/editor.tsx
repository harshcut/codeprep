'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { GripHorizontal } from 'lucide-react'

export default function Editor() {
  return (
    <PanelGroup direction="vertical" className="max-w-6xl h-full mx-auto">
      <Panel className="bg-purple-200" />
      <PanelResizeHandle className="flex justify-center">
        <GripHorizontal className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel className="bg-teal-200" />
    </PanelGroup>
  )
}
