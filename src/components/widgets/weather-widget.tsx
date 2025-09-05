import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react'
import { WidgetCard } from './widget-card'

const weatherData = {
  city: 'Sua Cidade',
  temperature: 28,
  condition: 'Ensolarado',
  icon: 'sun',
}

const WeatherIcon = ({
  icon,
  className,
}: {
  icon: string
  className?: string
}) => {
  switch (icon) {
    case 'sun':
      return <Sun className={className} />
    case 'cloud':
      return <Cloud className={className} />
    case 'rain':
      return <CloudRain className={className} />
    case 'snow':
      return <CloudSnow className={className} />
    default:
      return <Sun className={className} />
  }
}

export const WeatherWidget = () => {
  return (
    <WidgetCard title="Clima">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold">{weatherData.temperature}°C</p>
          <p className="text-lg text-muted-foreground">
            {weatherData.condition}
          </p>
          <p className="text-sm text-muted-foreground">{weatherData.city}</p>
        </div>
        <div className="text-primary">
          <WeatherIcon
            icon={weatherData.icon}
            className="w-24 h-24 animate-pulse"
          />
        </div>
      </div>
    </WidgetCard>
  )
}
