import Link from 'next/link'
import Image from 'next/image'
import Navbar from './navbar'

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="border-b border-slate-200">
        <nav className="mx-auto h-16 px-6 max-w-6xl grid grid-cols-2 items-center">
          <Link href="/me/dashboard" className="justify-self-start">
            <Image src="/head.png" width={100} height={25} alt="Code Prep" draggable="false" />
          </Link>
          <Navbar />
        </nav>
      </section>
      {children}
    </>
  )
}
