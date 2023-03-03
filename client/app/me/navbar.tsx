'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Settings, User, Plus, UserPlus } from 'lucide-react'
import { Avatar, DropdownMenu } from 'ui'

export default function Navbar() {
  const { data: session } = useSession()
  const email = session?.user?.email

  return (
    <nav className="h-16 px-6 flex items-center border-b border-x border-slate-200">
      <Link href="/me/dashboard">
        <Image src="/head.png" width={100} height={25} alt="Code Prep" draggable="false" />
      </Link>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Avatar className="ml-auto cursor-pointer">
            <Avatar.Image
              src={`https://source.boringavatars.com/bauhaus/120/${email}?colors=DACDAC,F39708,F85741,0E9094,1E1801`}
              draggable={false}
            />
            <Avatar.Fallback>{email?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
          </Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-56">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item disabled>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <DropdownMenu.Item asChild>
              <Link href="/me/playground">
                <Plus className="mr-2 h-4 w-4" />
                <span>Playground</span>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item disabled>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </nav>
  )
}
