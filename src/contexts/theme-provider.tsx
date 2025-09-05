import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

type Theme = 'dark' | 'light' | 'system'
type BackgroundTheme = 'aurora' | 'sunset' | 'particles' | 'solid'

const ALL_WIDGETS = [
  'focus',
  'tasks',
  'weather',
  'quote',
  'calendar',
  'mood',
  'notes',
  'habits',
  'music',
]

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  backgroundTheme: BackgroundTheme
  setBackgroundTheme: (theme: BackgroundTheme) => void
  isSettingsOpen: boolean
  setSettingsOpen: (isOpen: boolean) => void
  visibleWidgets: string[]
  toggleWidget: (widgetId: string) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  backgroundTheme: 'aurora',
  setBackgroundTheme: () => null,
  isSettingsOpen: false,
  setSettingsOpen: () => null,
  visibleWidgets: ALL_WIDGETS,
  toggleWidget: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultBackground = 'aurora',
  storageKey = 'vite-ui-theme',
  backgroundStorageKey = 'vite-ui-background',
  widgetsStorageKey = 'vite-visible-widgets',
}: {
  children: ReactNode
  defaultTheme?: Theme
  defaultBackground?: BackgroundTheme
  storageKey?: string
  backgroundStorageKey?: string
  widgetsStorageKey?: string
}) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme)
  const [backgroundTheme, setBackgroundTheme] =
    useLocalStorage<BackgroundTheme>(backgroundStorageKey, defaultBackground)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [visibleWidgets, setVisibleWidgets] = useLocalStorage<string[]>(
    widgetsStorageKey,
    initialState.visibleWidgets,
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const toggleWidget = (widgetId: string) => {
    setVisibleWidgets((prev) =>
      prev.includes(widgetId)
        ? prev.filter((id) => id !== widgetId)
        : [...prev, widgetId],
    )
  }

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
    },
    backgroundTheme,
    setBackgroundTheme,
    isSettingsOpen,
    setSettingsOpen,
    visibleWidgets,
    toggleWidget,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
