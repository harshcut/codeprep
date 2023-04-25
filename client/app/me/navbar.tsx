'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Settings, User, Plus, Home, Calendar } from 'lucide-react'
import { Avatar, DropdownMenu, Command, Button } from 'ui'

export default function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const email = session?.user?.email
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-self-center text-sm text-slate-500 dark:text-slate-400 invisible sm:visible"
        onClick={() => setOpen(true)}
      >
        <span>Search...</span>
        <kbd className="pointer-events-none absolute top-2 right-1.5 h-5 select-none rounded border border-slate-100 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          ⌘ + K
        </kbd>
      </Button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item onSelect={() => runCommand(() => router.push('/me/profile'))}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/me/dashboard'))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/me/schedule'))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule Meet</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/me/playground'))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Playground</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => router.push('/me/settings'))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Avatar className="justify-self-end cursor-pointer">
            <Avatar.Image
              src={`https://source.boringavatars.com/marble/120/${email}`}
              draggable={false}
            />
            <Avatar.Fallback>{email?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
          </Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item onSelect={() => router.push('/me/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => router.push('/me/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item onSelect={() => router.push('/me/dashboard')}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => router.push('/me/schedule')}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule Meet</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => router.push('/me/playground')}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Playground</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onSelect={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </>
  )
}
