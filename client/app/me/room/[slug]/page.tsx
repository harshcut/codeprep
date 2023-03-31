import Resizable from './resizable'

export default function Room({ params }: { params: { slug: string } }) {
  return (
    <section className="h-[calc(100vh-65px)]">
      <Resizable id={params.slug} />
    </section>
  )
}

export const metadata = { title: 'Room — Code Prep' }
