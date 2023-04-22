import PostForm from './post-form'
import RoomForm from './room-form'

export default function Dashboard() {
  return (
    <div className="mx-auto h-[calc(100vh-65px)] max-w-6xl flex flex-col md:grid md:grid-cols-3">
      <section className="px-6 pb-6 order-last md:col-span-2 md:order-first">
        <h1 className="my-4 text-xl font-semibold tracking-tight">Create a Post</h1>
        <PostForm />
      </section>
      <section className="bg-slate-50 px-6 pb-6 border-b border-slate-200 md:border-x">
        <h1 className="my-4 text-xl font-semibold tracking-tight">Join a Room</h1>
        <RoomForm />
      </section>
    </div>
  )
}

export const metadata = { title: 'Dashboard — Code Prep' }
