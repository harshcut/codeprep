'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Label, Button } from 'ui'
import { ScreenShare } from 'lucide-react'

interface FormValues {
  id: string
}

export default function RoomForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()
  const [loading, setLoading] = React.useState(false)

  const onSubmit: SubmitHandler<FormValues> = ({ id }) => {
    setLoading(true)
    router.push(`/me/room/${id}`)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1.5">
        <Label htmlFor="id">Room ID</Label>
        <Input
          className="bg-white"
          {...register('id', { required: true })}
          id="id"
          placeholder="insert-room-id-here"
          readOnly={loading}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          <ScreenShare className="mr-2 h-4 w-4" />
          Join Room
        </Button>
      </div>
    </form>
  )
}
