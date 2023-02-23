import * as React from 'react'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { Input, Label, Button, useToast } from 'ui'
import { authOptions } from './api/auth/[...nextauth]'
import type { GetServerSideProps } from 'next'

interface FormValues {
  email: string
  password: string
}

export default function Home() {
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
    <div className="grid place-items-center min-h-screen">
      <main className="grid gap-6 w-full max-w-[400px] p-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Login to Code Prep</h1>
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
        <div className="grid gap-1.5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Don&apos;t have an account?</p>
          <Button variant="outline" type="button" onClick={() => router.push('/register')}>
            Sign Up
          </Button>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (session) {
    return { redirect: { destination: '/me/dashboard', permanent: false } }
  }
  return { props: {} }
}
