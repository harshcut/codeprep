'use client'

import { SessionProvider } from 'next-auth/react'
import { Toast } from 'ui'
import type { Session } from 'next-auth'

interface ProviderProps {
  session?: Session
}

export default function Provider({ session, children }: React.PropsWithChildren<ProviderProps>) {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
      <Toast.Provider />
    </>
  )
}
