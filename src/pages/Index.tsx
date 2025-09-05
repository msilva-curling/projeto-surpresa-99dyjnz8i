import { useState, DragEvent } from 'react'
import { FocusTimerWidget } from '@/components/widgets/focus-timer-widget'
import { TasksWidget } from '@/components/widgets/tasks-widget'
import { WeatherWidget } from '@/components/widgets/weather-widget'
import { QuoteWidget } from '@/components/widgets/quote-widget'
import { NotesWidget } from '@/components/widgets/notes-widget'
import { CalendarWidget } from '@/components/widgets/calendar-widget'
import { MoodWidget } from '@/components/widgets/mood-widget'
import { HabitTrackerWidget } from '@/components/widgets/habit-tracker-widget'
import { MusicPlayerWidget } from '@/components/widgets/music-player-widget'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useTheme } from '@/contexts/theme-provider'
import { cn } from '@/lib/utils'

const initialWidgets = [
  { id: 'focus', component: FocusTimerWidget },
  { id: 'tasks', component: TasksWidget },
  { id: 'habits', component: HabitTrackerWidget },
  { id: 'weather', component: WeatherWidget },
  { id: 'quote', component: QuoteWidget },
  { id: 'music', component: MusicPlayerWidget },
  { id: 'calendar', component: CalendarWidget },
  { id: 'mood', component: MoodWidget },
  { id: 'notes', component: NotesWidget },
]

const Index = () => {
  const [widgetOrder, setWidgetOrder] = useLocalStorage(
    'dashboard-widgets-order',
    initialWidgets.map((w) => w.id),
  )
  const { visibleWidgets } = useTheme()
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

    const draggedIndex = widgetOrder.indexOf(draggedItem)
    const targetIndex = widgetOrder.indexOf(targetId)

    const newOrder = [...widgetOrder]
    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedItem)
    setWidgetOrder(newOrder)
    setDraggedItem(null)
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50', 'scale-95')
  }

  const widgetMap = new Map(initialWidgets.map((w) => [w.id, w.component]))
  const displayedWidgets = widgetOrder.filter((id) =>
    visibleWidgets.includes(id),
  )

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedWidgets.map((widgetId, index) => {
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
                {
                  'lg:col-span-2': ['tasks', 'habits'].includes(widgetId),
                  'md:col-span-1': ['tasks', 'habits'].includes(widgetId),
                },
              )}
              style={{ animationDelay: `${index * 100}ms` }}
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
