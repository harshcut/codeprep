'use client'

import * as React from 'react'
import { Input, Textarea, Label, Button } from 'ui'
import { ScreenShare } from 'lucide-react'

export default function RoomForm() {
  return (
    <form className="grid gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="id">Room ID</Label>
        <Input className="bg-white" id="id" placeholder="insert-room-id-here" />
      </div>
      <div className="flex justify-end">
        <Button type="submit">
          <ScreenShare className="mr-2 h-4 w-4" />
          Join Room
        </Button>
      </div>
    </form>
  )
}
