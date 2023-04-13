import ScheduleForm from './schedule-form'

export default function Schedule() {
  return (
    <section className="mx-auto h-[calc(100vh-65px)] max-w-6xl px-6">
      <h1 className="pt-4 text-xl font-semibold tracking-tight">Schedule a Meeting</h1>
      <p className="mb-6 leading-7 text-slate-600">
        Plan in advance. Select available date and time for the meeting.
      </p>
      <ScheduleForm />
    </section>
  )
}

export const metadata = { title: 'Schedule — Code Prep' }
