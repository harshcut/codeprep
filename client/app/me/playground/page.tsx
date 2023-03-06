import Editor from './editor'

export default function Playground() {
  return (
    <section className="h-[calc(100vh-65px)]">
      <Editor />
    </section>
  )
}

export const metadata = { title: 'Playground — Code Prep' }
