import { useRef } from "react"

interface IUseAudioOptions {
  src: string
}

export default function useAudio({ src }: IUseAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(typeof Audio !== "undefined" ? new Audio(src) : null)

  const playSound = async () => {
    if (!audioRef.current) return
    try {
      audioRef.current.currentTime = 0
      await audioRef.current.play()
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  const stopSound = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  const setVolume = (volume: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = Math.min(1, Math.max(0, volume))
  }

  return { playSound, stopSound, setVolume }
}
