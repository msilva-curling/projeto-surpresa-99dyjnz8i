import { useState } from 'react'
import { Plus, Flame, Trash2 } from 'lucide-react'
import { format, isToday, isYesterday, startOfDay } from 'date-fns'
import { WidgetCard } from './widget-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Habit {
  id: number
  text: string
  lastCompleted: string | null
  streak: number
}

const initialHabits: Habit[] = [
  { id: 1, text: 'Beber 2L de água', lastCompleted: null, streak: 0 },
  { id: 2, text: 'Ler 10 páginas', lastCompleted: null, streak: 0 },
  { id: 3, text: 'Meditar por 5 minutos', lastCompleted: null, streak: 0 },
]

export const HabitTrackerWidget = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', initialHabits)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newHabitText, setNewHabitText] = useState('')

  const handleAddHabit = () => {
    if (newHabitText.trim()) {
      const newHabit: Habit = {
        id: Date.now(),
        text: newHabitText,
        lastCompleted: null,
        streak: 0,
      }
      setHabits([...habits, newHabit])
      setNewHabitText('')
      setIsDialogOpen(false)
    }
  }

  const handleDeleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const handleToggleHabit = (id: number, checked: boolean) => {
    const todayStr = format(startOfDay(new Date()), 'yyyy-MM-dd')

    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit
        if (checked) {
          const lastCompletedDate = habit.lastCompleted
            ? startOfDay(new Date(habit.lastCompleted))
            : null
          const streak =
            lastCompletedDate && isYesterday(lastCompletedDate)
              ? habit.streak + 1
              : 1
          return { ...habit, lastCompleted: todayStr, streak }
        } else {
          return { ...habit, lastCompleted: null, streak: 0 }
        }
      }),
    )
  }

  return (
    <WidgetCard title="Rastreador de Hábitos">
      <div className="space-y-4">
        <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
          {habits.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nenhum hábito adicionado.
            </p>
          ) : (
            habits.map((habit) => {
              const isCompletedToday = habit.lastCompleted
                ? isToday(new Date(habit.lastCompleted))
                : false
              return (
                <div
                  key={habit.id}
                  className="flex items-center gap-3 group p-2 rounded-md hover:bg-accent transition-colors"
                >
                  <Checkbox
                    id={`habit-${habit.id}`}
                    checked={isCompletedToday}
                    onCheckedChange={(checked) =>
                      handleToggleHabit(habit.id, !!checked)
                    }
                  />
                  <label
                    htmlFor={`habit-${habit.id}`}
                    className={cn(
                      'flex-1 cursor-pointer',
                      isCompletedToday && 'line-through text-muted-foreground',
                    )}
                  >
                    {habit.text}
                  </label>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="h-4 w-4" />
                    <span className="font-bold text-sm">{habit.streak}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteHabit(habit.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              )
            })
          )}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Adicionar Hábito
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Hábito</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="habit-name">Nome do Hábito</Label>
              <Input
                id="habit-name"
                value={newHabitText}
                onChange={(e) => setNewHabitText(e.target.value)}
                placeholder="Ex: Ler um livro"
                onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddHabit}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </WidgetCard>
  )
}
