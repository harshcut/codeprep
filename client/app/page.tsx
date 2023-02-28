import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from 'ui'
import { getSession } from '@/utils'
import LoginForm from './login-form'

export default async function Home() {
  const session = await getSession(headers().get('cookie') ?? '')
  if (session) redirect('/me/dashboard')

  return (
    <div className="grid place-items-center min-h-screen">
      <main className="grid gap-6 w-full max-w-[400px] p-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Login to Code Prep</h1>
        <LoginForm />
        <div className="grid gap-1.5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Don&apos;t have an account?</p>
          <Link href="/register">
            <Button variant="outline" type="button" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export const metadata = { title: 'Login — Code Prep' }
