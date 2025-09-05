import { useState, useRef, useEffect } from 'react'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { WidgetCard } from './widget-card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const tracks = [
  {
    title: 'Lofi Chill',
    artist: 'Ambient Beats',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://img.usecurling.com/p/200/200?q=lofi%20girl',
  },
  {
    title: 'Forest Sounds',
    artist: 'Nature',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://img.usecurling.com/p/200/200?q=forest',
  },
  {
    title: 'Rainy Day',
    artist: 'Relaxation',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://img.usecurling.com/p/200/200?q=rainy%20window',
  },
]

export const MusicPlayerWidget = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useLocalStorage(
    'music-track-index',
    0,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useLocalStorage('music-volume', 0.5)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    if (isPlaying && audioRef.current) audioRef.current.play()
  }, [currentTrackIndex, isPlaying])

  const togglePlayPause = () => setIsPlaying(!isPlaying)
  const playNext = () =>
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  const playPrev = () =>
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)

  const handleTimeUpdate = () => {
    if (audioRef.current?.duration) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100,
      )
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current?.duration) {
      audioRef.current.currentTime =
        (value[0] / 100) * audioRef.current.duration
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    isPlaying ? audio.play().catch(() => setIsPlaying(false)) : audio.pause()
  }, [isPlaying])

  return (
    <WidgetCard title="Música Ambiente">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onLoadedMetadata={handleTimeUpdate}
      />
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-32 h-32 rounded-lg shadow-lg">
          <AvatarImage src={currentTrack.cover} alt={currentTrack.title} />
          <AvatarFallback>{currentTrack.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg text-center">
            {currentTrack.title}
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            {currentTrack.artist}
          </p>
        </div>
        <Slider value={[progress || 0]} onValueChange={handleSeek} />
        <div className="flex items-center justify-center gap-4 w-full">
          <Button variant="ghost" size="icon" onClick={playPrev}>
            <SkipBack />
          </Button>
          <Button size="icon" className="w-12 h-12" onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button variant="ghost" size="icon" onClick={playNext}>
            <SkipForward />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          {volume > 0 ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5" />
          )}
          <Slider
            value={[volume]}
            onValueChange={(v) => setVolume(v[0])}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </WidgetCard>
  )
}
