import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { Input, Label, Button } from 'ui'

interface FormValues {
  email: string
  password: string
}

export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const res = await signIn('credentials', { email, password, redirect: false })
    console.log(res)
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
          <Button type="submit">Login</Button>
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
