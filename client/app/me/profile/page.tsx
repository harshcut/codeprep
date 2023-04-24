import DetailsPane from './details-pane'

export default function Profile() {
  return (
    <div className="mx-auto h-[calc(100vh-65px)] max-w-6xl flex flex-col md:grid md:grid-cols-3">
      <section className="bg-slate-50 p-6 border-b border-slate-200 md:border-x">
        <DetailsPane />
      </section>
      <section className="px-6 pb-6 md:col-span-2">
        <h1 className="my-4 text-xl font-semibold tracking-tight">Profile</h1>
      </section>
    </div>
  )
}

export const metadata = { title: 'Profile — Code Prep' }
