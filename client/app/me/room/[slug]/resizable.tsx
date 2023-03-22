'use client'

import * as React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { GripHorizontal, GripVertical } from 'lucide-react'

export default function Resizable() {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={21} minSize={21} collapsible className="bg-blue-200" />
      <PanelResizeHandle className="flex items-center">
        <GripVertical className="h-4 w-4" />
      </PanelResizeHandle>
      <Panel minSize={50}>
        <PanelGroup direction="vertical">
          <Panel minSize={50} className="bg-teal-200" />
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
