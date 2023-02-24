import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { Toast } from 'ui'
import type { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Code Prep</title>
        <meta name="description" content="Collaborate and Conquer Coding Challenges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Toast.Provider />
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
    </>
  )
}
