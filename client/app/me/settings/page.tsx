import SettingsForm from './settings-form'

export default function Profile() {
  return (
    <div className="mx-auto h-[calc(100vh-65px)] max-w-6xl px-6 pt-6">
      <h1 className="text-xl font-semibold tracking-tight mb-4">Settings</h1>
      <SettingsForm />
    </div>
  )
}

export const metadata = { title: 'Settings — Code Prep' }
