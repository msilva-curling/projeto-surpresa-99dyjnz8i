import { useState } from 'react'
import { Smile, Meh, Frown, Zap, BatteryCharging } from 'lucide-react'
import { WidgetCard } from './widget-card'
import { cn } from '@/lib/utils'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const moods = [
  { name: 'Feliz', icon: Smile, color: 'text-green-500' },
  { name: 'Neutro', icon: Meh, color: 'text-yellow-500' },
  { name: 'Triste', icon: Frown, color: 'text-blue-500' },
  { name: 'Energético', icon: Zap, color: 'text-orange-500' },
  { name: 'Cansado', icon: BatteryCharging, color: 'text-gray-500' },
]

const moodData = [
  { date: 'Seg', mood: 3 },
  { date: 'Ter', mood: 4 },
  { date: 'Qua', mood: 2 },
  { date: 'Qui', mood: 5 },
  { date: 'Sex', mood: 4 },
  { date: 'Sáb', mood: 5 },
  { date: 'Dom', mood: 3 },
]

export const MoodWidget = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>('Feliz')

  return (
    <WidgetCard title="Humor Diário">
      <div className="space-y-6">
        <div className="flex justify-around">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={cn(
                'p-2 rounded-full transition-all duration-200',
                selectedMood === mood.name
                  ? 'bg-primary/20 scale-125'
                  : 'hover:bg-accent',
              )}
            >
              <mood.icon className={cn('w-8 h-8', mood.color)} />
            </button>
          ))}
        </div>
        <div className="h-32">
          <ChartContainer config={{}} className="w-full h-full">
            <BarChart
              accessibilityLayer
              data={moodData}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis hide={true} domain={[0, 5]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="mood" fill="var(--color-primary)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </WidgetCard>
  )
}
