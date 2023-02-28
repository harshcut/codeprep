'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Label, Button, useToast } from 'ui'

interface FormValues {
  email: string
  password: string
  confirm: string
}

export default function RegisterForm() {
  const router = useRouter()
  const { register, handleSubmit, watch } = useForm<FormValues>()
  const { setToast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    setLoading(true)
    const { data, error } = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json())
    if (!data) {
      setToast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}. Try again with different credentials.`,
        variant: 'destructive',
      })
      return setLoading(false)
    }
    router.push('/me/dashboard')
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register('email', { required: true })}
          id="email"
          placeholder="me@mail.com"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          {...register('password', { required: true })}
          id="password"
          placeholder="••••••••••••"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          type="password"
          {...register('confirm', { required: true, validate: (v) => v === watch('password') })}
          id="confirm"
          placeholder="••••••••••••"
        />
      </div>
      <Button type="submit" disabled={loading}>
        Sign Up
      </Button>
    </form>
  )
}
