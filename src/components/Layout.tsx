import { Outlet } from 'react-router-dom'
import { DynamicBackground } from '@/components/dynamic-background'
import { Header } from '@/components/header'
import { SettingsPanel } from '@/components/settings-panel'
import { cn } from '@/lib/utils'

export default function Layout() {
  return (
    <div className="relative min-h-screen font-sans antialiased">
      <DynamicBackground />
      <Header />
      <main className="relative z-10 pt-20 md:pt-24 pb-10">
        <Outlet />
      </main>
      <SettingsPanel />
    </div>
  )
}
