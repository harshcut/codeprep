'use client'

import * as React from 'react'
import moment from 'moment'
import { Tabs } from 'ui'
import { Clock, MinusCircle } from 'lucide-react'

const today = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const daysFromToday = Array.from({ length: 7 }, (_, i) => today.clone().add(i, 'days'))

export default function ScheduleForm() {
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
            const ended = hour.isBefore(moment())
            return (
              <button
                disabled={ended}
                className="text-left border border-slate-200 py-2 px-3 rounded-md disabled:bg-slate-100 disabled:text-slate-400"
                key={idx}
              >
                <div className="font-semibold">
                  {hour.format('HH:mm')} - {hour.format('HH')}:45
                </div>
                <div className={`flex items-center text-slate-500 mt-2 text-sm font-medium`}>
                  {ended ? (
                    <>
                      <MinusCircle className="mr-2 h-4 w-4" />
                      Ended
                    </>
                  ) : (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      45 min
                    </>
                  )}
                </div>
              </button>
            )
          })}
        </Tabs.Content>
      ))}
    </Tabs>
  )
}
