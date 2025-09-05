import { useState } from 'react'
import { WidgetCard } from './widget-card'
import { Calendar } from '@/components/ui/calendar'

export const CalendarWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <WidgetCard title="Calendário" className="p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="p-2"
        classNames={{
          head_cell: 'w-full',
          day: 'h-9 w-9',
        }}
      />
    </WidgetCard>
  )
}
