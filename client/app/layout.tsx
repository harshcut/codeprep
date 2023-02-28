import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { getSession } from '@/utils'
import Provider from './provider'

import 'tailwindcss/tailwind.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(headers().get('cookie') ?? '')

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  )
}
