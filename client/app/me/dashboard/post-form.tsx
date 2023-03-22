'use client'

import * as React from 'react'
import { Input, Textarea, Label, Button } from 'ui'
import { MessageCircle } from 'lucide-react'

export default function PostForm() {
  return (
    <form className="grid gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Post Title" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea className="resize-none" id="description" placeholder="Post Description..." />
      </div>
      <div className="flex justify-end">
        <Button type="submit">
          <MessageCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
    </form>
  )
}
