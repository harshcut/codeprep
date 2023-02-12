import { Input, Label, Button } from 'ui'

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen">
      <main className="grid gap-6 w-full max-w-[400px] p-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Login to Code Prep</h1>
        <form className="grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="me@mail.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="••••••••••••" />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div className="grid gap-1.5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Don&apos;t have an account?</p>
          <Button variant="outline" type="button">
            Sign Up
          </Button>
        </div>
      </main>
    </div>
  )
}
