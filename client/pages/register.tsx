import { useRouter } from 'next/router'
import { Input, Label, Button } from 'ui'

export default function Register() {
  const router = useRouter()

  return (
    <div className="grid place-items-center min-h-screen">
      <main className="grid gap-6 w-full max-w-[400px] p-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Register for Code Prep</h1>
        <form className="grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="me@mail.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="••••••••••••" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input type="password" id="confirm_password" placeholder="••••••••••••" />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <div className="grid gap-1.5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Already have an account?</p>
          <Button variant="outline" type="button" onClick={() => router.push('/')}>
            Login
          </Button>
        </div>
      </main>
    </div>
  )
}
