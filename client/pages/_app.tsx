import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

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
    </>
  )
}
