'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input, Label, Button, useToast } from 'ui'

interface FormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()
  const { setToast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    if (!res?.ok) {
      setToast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem logging you in. Try again with different credentials.',
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
      <Button type="submit" disabled={loading}>
        Login
      </Button>
    </form>
  )
}
