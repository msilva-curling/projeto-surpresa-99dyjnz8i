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

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  backgroundTheme: BackgroundTheme
  setBackgroundTheme: (theme: BackgroundTheme) => void
  isSettingsOpen: boolean
  setSettingsOpen: (isOpen: boolean) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  backgroundTheme: 'aurora',
  setBackgroundTheme: () => null,
  isSettingsOpen: false,
  setSettingsOpen: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultBackground = 'aurora',
  storageKey = 'vite-ui-theme',
  backgroundStorageKey = 'vite-ui-background',
}: {
  children: ReactNode
  defaultTheme?: Theme
  defaultBackground?: BackgroundTheme
  storageKey?: string
  backgroundStorageKey?: string
}) {
  const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme)
  const [backgroundTheme, setBackgroundTheme] =
    useLocalStorage<BackgroundTheme>(backgroundStorageKey, defaultBackground)
  const [isSettingsOpen, setSettingsOpen] = useState(false)

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

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
    },
    backgroundTheme,
    setBackgroundTheme,
    isSettingsOpen,
    setSettingsOpen,
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
