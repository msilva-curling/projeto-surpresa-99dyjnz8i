import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { WidgetCard } from './widget-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

interface Task {
  id: number
  text: string
  completed: boolean
}

export const TasksWidget = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', [
    { id: 1, text: 'Finalizar o design do dashboard', completed: false },
    { id: 2, text: 'Implementar a lógica do timer', completed: true },
    { id: 3, text: 'Conectar com a API de clima', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <WidgetCard title="Minhas Tarefas">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Adicionar nova tarefa..."
          />
          <Button onClick={handleAddTask} size="icon">
            <Plus />
          </Button>
        </div>
        <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nenhuma tarefa adicionada ainda.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 group p-2 rounded-md hover:bg-accent"
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    'flex-1 cursor-pointer transition-colors',
                    task.completed && 'line-through text-muted-foreground',
                  )}
                >
                  {task.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </WidgetCard>
  )
}
