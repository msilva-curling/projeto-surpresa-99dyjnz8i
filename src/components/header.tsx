import { Settings, LogOut, BrainCircuit } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from '@/contexts/theme-provider'

export const Header = () => {
  const { setSettingsOpen } = useTheme()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 backdrop-blur-lg bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-black/10">
      <div className="container mx-auto flex items-center justify-between h-full px-4 md:px-6">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={scrollToTop}
        >
          <BrainCircuit className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            FlowDesk
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="transition-transform duration-300 hover:scale-110 focus:outline-none">
                <Avatar className="h-10 w-10 border-2 border-primary/50">
                  <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=female&seed=1" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setSettingsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
