import { WidgetCard } from './widget-card'
import { Textarea } from '@/components/ui/textarea'
import { useLocalStorage } from '@/hooks/use-local-storage'

export const NotesWidget = () => {
  const [notes, setNotes] = useLocalStorage(
    'quick-notes',
    'Suas anotações rápidas aqui...',
  )

  return (
    <WidgetCard title="Notas Rápidas">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="h-48 resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
        placeholder="Comece a digitar..."
      />
    </WidgetCard>
  )
}
