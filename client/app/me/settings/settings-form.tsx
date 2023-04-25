'use client'

import * as React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Textarea, Label, Button, useToast } from 'ui'

interface FormValues {
  name?: string
  bio?: string
  location?: string
  yoe?: number
}

export default function SettingsForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const { setToast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true)
    const { data, error } = await fetch('/api/profile/write', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((res) => res.json())
    if (!data) {
      setToast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}. Try reloading the page.`,
        variant: 'destructive',
      })
      return setLoading(false)
    }
    setToast({
      title: 'Profile Updated.',
      description: 'Head to your profile to see the changes.',
    })
    return setLoading(false)
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input {...register('name')} id="name" placeholder="John Doe" readOnly={loading} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          {...register('bio')}
          id="bio"
          placeholder="Type your message here."
          readOnly={loading}
          className="resize-none"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="location">Location</Label>
        <Input {...register('location')} id="location" placeholder="Country" readOnly={loading} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="yoe">YOE (Years of Experience)</Label>
        <Input
          type="number"
          defaultValue={0}
          min={0}
          {...register('yoe', { valueAsNumber: true })}
          id="yoe"
          placeholder="2"
          readOnly={loading}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="reset" variant="outline" onClick={() => reset()}>
          Clear
        </Button>
        <Button type="submit" disabled={loading}>
          Update
        </Button>
      </div>
    </form>
  )
}
