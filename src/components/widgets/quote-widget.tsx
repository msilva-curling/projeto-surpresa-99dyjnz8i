import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { WidgetCard } from './widget-card'
import { Button } from '@/components/ui/button'

const quotes = [
  {
    text: 'A única maneira de fazer um ótimo trabalho é amar o que você faz.',
    author: 'Steve Jobs',
  },
  {
    text: 'A persistência é o caminho do êxito.',
    author: 'Charles Chaplin',
  },
  {
    text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.',
    author: 'Robert Collier',
  },
  {
    text: 'Acredite em você mesmo e em tudo que você é. Saiba que existe algo dentro de você que é maior que qualquer obstáculo.',
    author: 'Christian D. Larson',
  },
]

export const QuoteWidget = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  const nextQuote = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
  }

  const { text, author } = quotes[currentQuoteIndex]

  return (
    <WidgetCard title="Citação do Dia">
      <div className="flex flex-col justify-between h-full min-h-[150px]">
        <blockquote className="space-y-2">
          <p className="text-lg italic">"{text}"</p>
          <footer className="text-sm text-right text-muted-foreground">
            — {author}
          </footer>
        </blockquote>
        <div className="flex justify-end mt-4">
          <Button variant="ghost" size="icon" onClick={nextQuote}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Próxima Citação</span>
          </Button>
        </div>
      </div>
    </WidgetCard>
  )
}
