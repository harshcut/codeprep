'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Label, Button } from 'ui'
import { ArrowUpRight, Plus } from 'lucide-react'
import { generatePassphrase } from 'niceware'

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

  const onCreate = () => {
    setLoading(true)
    router.push(`/me/room/${generatePassphrase(8).join('-')}`)
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
      <div className="flex justify-end gap-4">
        <Button
          className="bg-white"
          type="button"
          variant="outline"
          onClick={onCreate}
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
        <Button type="submit" disabled={loading}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Join Room
        </Button>
      </div>
    </form>
  )
}
