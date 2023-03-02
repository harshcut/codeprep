import Navbar from './navbar'

export default async function MeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Navbar />
      {children}
    </div>
  )
}
