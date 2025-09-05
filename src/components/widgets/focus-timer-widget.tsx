import { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WidgetCard } from './widget-card'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

type TimerMode = 'focus' | 'shortBreak' | 'longBreak'

const MODE_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

export const FocusTimerWidget = () => {
  const [mode, setMode] = useState<TimerMode>('focus')
  const [timeLeft, setTimeLeft] = useState(MODE_DURATIONS[mode])
  const [isActive, setIsActive] = useState(false)

  const resetTimer = useCallback(() => {
    setIsActive(false)
    setTimeLeft(MODE_DURATIONS[mode])
  }, [mode])

  useEffect(() => {
    resetTimer()
  }, [mode, resetTimer])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      // Add notification/sound logic here
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progress =
    ((MODE_DURATIONS[mode] - timeLeft) / MODE_DURATIONS[mode]) * 100

  return (
    <WidgetCard title="Foco">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 dark:text-gray-700"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            />
            <circle
              className="text-primary"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="text-5xl md:text-6xl font-extrabold text-foreground">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex gap-2">
          {Object.keys(MODE_DURATIONS).map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'default' : 'outline'}
              onClick={() => setMode(m as TimerMode)}
              className="capitalize"
            >
              {m === 'focus' ? 'Foco' : m === 'shortBreak' ? 'Curto' : 'Longo'}
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={() => setIsActive(!isActive)}
            className="w-32"
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button size="lg" variant="secondary" onClick={resetTimer}>
            <RotateCcw />
          </Button>
        </div>
      </div>
    </WidgetCard>
  )
}
