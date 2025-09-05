import { SlidersHorizontal, Palette, Sparkles, Paintbrush } from 'lucide-react'
import { useTheme } from '@/contexts/theme-provider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

const backgroundOptions = [
  {
    id: 'aurora',
    name: 'Aurora Boreal',
    icon: <Paintbrush className="h-5 w-5 text-purple-400" />,
  },
  {
    id: 'sunset',
    name: 'Pôr do Sol Suave',
    icon: <Paintbrush className="h-5 w-5 text-orange-400" />,
  },
  {
    id: 'particles',
    name: 'Partículas Dinâmicas',
    icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: 'solid',
    name: 'Cor Sólida',
    icon: <Palette className="h-5 w-5 text-gray-400" />,
  },
]

const widgetOptions = [
  { id: 'focus', name: 'Timer de Foco' },
  { id: 'tasks', name: 'Minhas Tarefas' },
  { id: 'weather', name: 'Clima' },
  { id: 'quote', name: 'Citação do Dia' },
  { id: 'calendar', name: 'Calendário' },
  { id: 'mood', name: 'Humor Diário' },
  { id: 'notes', name: 'Notas Rápidas' },
  { id: 'habits', name: 'Rastreador de Hábitos' },
  { id: 'music', name: 'Música Ambiente' },
]

export const SettingsPanel = () => {
  const {
    isSettingsOpen,
    setSettingsOpen,
    theme,
    setTheme,
    backgroundTheme,
    setBackgroundTheme,
    visibleWidgets,
    toggleWidget,
  } = useTheme()

  return (
    <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <SheetContent className="w-full sm:w-[400px] bg-white/90 dark:bg-black/90 backdrop-blur-xl border-l-0 sm:border-l overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <SlidersHorizontal /> Configurações
          </SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-8">
          <section className="space-y-4">
            <h3 className="font-semibold text-lg">Aparência</h3>
            <div className="space-y-2">
              <Label>Tema</Label>
              <RadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as any)}
                className="flex gap-4"
              >
                <Label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="light" /> Claro
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="dark" /> Escuro
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="system" /> Sistema
                </Label>
              </RadioGroup>
            </div>
            <Separator />
            <div className="space-y-3">
              <Label>Plano de Fundo</Label>
              <RadioGroup
                value={backgroundTheme}
                onValueChange={(value) => setBackgroundTheme(value as any)}
                className="space-y-2"
              >
                {backgroundOptions.map((opt) => (
                  <Label
                    key={opt.id}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
                  >
                    <RadioGroupItem value={opt.id} /> {opt.icon}{' '}
                    <span>{opt.name}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </section>
          <Separator />
          <section className="space-y-4">
            <h3 className="font-semibold text-lg">Gerenciar Widgets</h3>
            {widgetOptions.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center justify-between"
              >
                <Label htmlFor={`${widget.id}-widget-switch`}>
                  {widget.name}
                </Label>
                <Switch
                  id={`${widget.id}-widget-switch`}
                  checked={visibleWidgets.includes(widget.id)}
                  onCheckedChange={() => toggleWidget(widget.id)}
                />
              </div>
            ))}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  )
}
