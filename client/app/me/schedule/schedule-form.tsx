'use client'

import * as React from 'react'
import moment from 'moment'
import { Tabs, AlertDialog, useToast } from 'ui'
import { Clock, MinusCircle, CheckCircle } from 'lucide-react'

const today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const daysFromToday = Array.from({ length: 7 }, (_, i) => today.clone().add(i, 'days'))

export default function ScheduleForm() {
  const [slots, setSlots] = React.useState<string[]>([])
  const { setToast } = useToast()

  React.useEffect(() => {
    ;(async () => {
      const { data } = await fetch('/api/slot/list', { next: { revalidate: 0 } }).then((res) =>
        res.json()
      )
      if (!data) return
      setSlots(data)
    })()
  }, [])

  const onSubmit = async (slot: moment.Moment) => {
    const { data, error } = await fetch('/api/slot/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: slot.toISOString() }),
    }).then((res) => res.json())
    if (!data) {
      return setToast({
        title: 'Uh oh! Something went wrong.',
        description: `${error}. Try reloading the page.`,
        variant: 'destructive',
      })
    }
    setToast({
      title: 'Slot is booked.',
      description: `You have scheduled a slot at ${slot.format('h:mm A')} on ${slot.format(
        'dddd, DD MMMM YYYY'
      )}`,
    })
    setSlots([...slots, data])
  }

  return (
    <Tabs defaultValue={today.toString()}>
      <Tabs.List className="w-full grid grid-cols-7 mb-4">
        {daysFromToday.map((day, idx) => (
          <Tabs.Trigger value={day.toString()} key={idx} className="flex-col items-start gap-1">
            <h3 className="font-semibold text-xs text-orange-600">
              {day.format('dddd').substring(0, 3).toUpperCase()}
            </h3>
            <h2 className="font-semibold text-2xl">{day.format('DD')}</h2>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {daysFromToday.map((day, idx) => (
        <Tabs.Content
          value={day.toString()}
          key={idx}
          className="border-none p-0 m-0 grid grid-cols-6 gap-4"
        >
          {Array.from({ length: 24 }, (_, i) => day.clone().add(i, 'hours')).map((hour, idx) => {
            const ended = hour.isBefore(moment().add(15, 'minutes'))
            const booked = slots.includes(hour.toISOString())

            return (
              <AlertDialog key={idx}>
                <AlertDialog.Trigger asChild>
                  <button
                    disabled={ended || booked}
                    className="text-left border border-slate-200 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <div className="font-semibold">
                      {hour.format('HH:mm')} - {hour.format('HH')}:45
                    </div>
                    <div className="flex items-center text-slate-500 mt-2 text-sm font-medium">
                      {ended ? (
                        <>
                          <MinusCircle className="mr-2 h-4 w-4" />
                          Ended
                        </>
                      ) : booked ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Booked
                        </>
                      ) : (
                        <>
                          <Clock className="mr-2 h-4 w-4" />
                          45 min
                        </>
                      )}
                    </div>
                  </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                  <AlertDialog.Header>
                    <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                    <AlertDialog.Description>
                      This action cannot be undone. This will set a meeting at{' '}
                      {hour.format('hh:mm A')} on {hour.format('dddd, DD MMMM YYYY')}.
                    </AlertDialog.Description>
                  </AlertDialog.Header>
                  <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action onClick={() => onSubmit(hour)}>Continue</AlertDialog.Action>
                  </AlertDialog.Footer>
                </AlertDialog.Content>
              </AlertDialog>
            )
          })}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
