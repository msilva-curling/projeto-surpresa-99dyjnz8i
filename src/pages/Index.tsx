import { useState, DragEvent } from 'react'
import { FocusTimerWidget } from '@/components/widgets/focus-timer-widget'
import { TasksWidget } from '@/components/widgets/tasks-widget'
import { WeatherWidget } from '@/components/widgets/weather-widget'
import { QuoteWidget } from '@/components/widgets/quote-widget'
import { NotesWidget } from '@/components/widgets/notes-widget'
import { CalendarWidget } from '@/components/widgets/calendar-widget'
import { MoodWidget } from '@/components/widgets/mood-widget'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

const initialWidgets = [
  { id: 'focus', component: FocusTimerWidget },
  { id: 'tasks', component: TasksWidget },
  { id: 'weather', component: WeatherWidget },
  { id: 'quote', component: QuoteWidget },
  { id: 'calendar', component: CalendarWidget },
  { id: 'mood', component: MoodWidget },
  { id: 'notes', component: NotesWidget },
]

const Index = () => {
  const [widgets, setWidgets] = useLocalStorage(
    'dashboard-widgets',
    initialWidgets.map((w) => w.id),
  )
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItem(id)
    e.dataTransfer.effectAllowed = 'move'
    e.currentTarget.classList.add('opacity-50', 'scale-95')
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault()
    if (!draggedItem || draggedItem === targetId) return

    const draggedIndex = widgets.indexOf(draggedItem)
    const targetIndex = widgets.indexOf(targetId)

    const newWidgets = [...widgets]
    newWidgets.splice(draggedIndex, 1)
    newWidgets.splice(targetIndex, 0, draggedItem)
    setWidgets(newWidgets)
    setDraggedItem(null)
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-95')
  }

  const widgetMap = new Map(initialWidgets.map((w) => [w.id, w.component]))

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widgetId) => {
          const WidgetComponent = widgetMap.get(widgetId)
          if (!WidgetComponent) return null
          return (
            <div
              key={widgetId}
              id={widgetId}
              draggable
              onDragStart={(e) => handleDragStart(e, widgetId)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, widgetId)}
              onDragEnd={handleDragEnd}
              className={cn(
                'cursor-grab transition-all duration-300 ease-in-out animate-fade-in-up',
                'focus-within:cursor-default',
              )}
              style={{ animationDelay: `${widgets.indexOf(widgetId) * 100}ms` }}
            >
              <WidgetComponent />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index
