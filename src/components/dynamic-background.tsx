import { useTheme } from '@/contexts/theme-provider'
import { cn } from '@/lib/utils'

const AuroraBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 dark:from-indigo-900 dark:via-purple-900 dark:to-slate-900',
        'bg-[size:200%_200%] animate-gradient-shift',
      )}
    />
  </div>
)

const SunsetBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 dark:from-orange-800 dark:via-red-900 dark:to-black',
        'bg-[size:200%_200%] animate-gradient-shift',
      )}
    />
  </div>
)

const ParticlesBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-background">
    <div id="particle-container" className="w-full h-full">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 animate-float"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * -20}s`,
          }}
        />
      ))}
    </div>
  </div>
)

const SolidBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full -z-10 bg-background" />
)

export const DynamicBackground = () => {
  const { backgroundTheme } = useTheme()

  switch (backgroundTheme) {
    case 'aurora':
      return <AuroraBackground />
    case 'sunset':
      return <SunsetBackground />
    case 'particles':
      return <ParticlesBackground />
    case 'solid':
    default:
      return <SolidBackground />
  }
}
