import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface WidgetCardProps {
  title: string
  children: ReactNode
  className?: string
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
  draggable?: boolean
  id?: string
}

export const WidgetCard = ({
  title,
  children,
  className,
  ...props
}: WidgetCardProps) => {
  return (
    <Card
      className={cn(
        'widget-card shadow-lg backdrop-blur-md transition-all duration-300 ease-out-quad',
        'bg-card/80 dark:bg-card/70 border border-white/20 dark:border-white/10',
        'hover:shadow-xl hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="widget-title text-xl md:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
