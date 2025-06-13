"use client"

import { cn } from "@/shared/lib/helpers"
import { Mic } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

interface AIVoiceInputProps {
  onStart?: () => void
  onStop?: (duration: number) => void
  visualizerBars?: number
  className?: string
}

export function AIVoiceInput({ onStart, onStop, visualizerBars = 48, className }: AIVoiceInputProps) {
  // Refs
  const hasStarted = useRef(false)

  // Third parties
  const { browserSupportsContinuousListening } = useSpeechRecognition()

  // States
  const [isRecording, setIsRecording] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [time, setTime] = useState(0)
  // const [selectedLanguage, setSelectedLanguage] = useState('uz-UZ'); // Default language is Uzbek

  // Ensure client-only rendering.
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle starting/stopping of listening.
  useEffect(() => {
    if (isRecording) {
      hasStarted.current = true
      onStart?.()
      if (browserSupportsContinuousListening) {
        SpeechRecognition.startListening({
          continuous: true
          // language: selectedLanguage, // Use the selected language
        })
      }
    } else if (hasStarted.current) {
      onStop?.(time)
      if (browserSupportsContinuousListening) {
        SpeechRecognition.stopListening()
      }
      setTime(0)
      hasStarted.current = false
    }
  }, [isRecording, onStart, onStop])

  // Timer effect: increment the recording time every second.
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRecording) {
      intervalId = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleClick = () => {
    setIsRecording(prev => !prev)
  }

  // const handleLanguageChange = (lang: string) => {
  //   setSelectedLanguage(lang)
  //   if (isRecording) {
  //     // Restart listening with the new language
  //     SpeechRecognition.stopListening()
  //     SpeechRecognition.startListening({
  //       continuous: true,
  //       language: lang
  //     })
  //   }
  // }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center gap-1.5">
        <button
          type="button"
          className={cn(
            "group flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 transition-all duration-300",
            isRecording ? "bg-black/5 dark:bg-white/5" : "hover:bg-black/10 dark:hover:bg-white/5"
          )}
          onClick={handleClick}
        >
          {isRecording ? (
            <div
              className="pointer-events-auto h-5 w-5 animate-spin cursor-pointer rounded-sm bg-black dark:bg-white"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="h-5 w-5 text-black/70 dark:text-white/70" />
          )}
        </button>

        <div
          className={cn(
            "font-mono text-sm tracking-wider transition-all duration-300",
            isRecording ? "text-black/70 dark:text-white/70" : "text-black/40 dark:text-white/40"
          )}
        >
          {formatTime(time)}
        </div>

        <div className="flex h-3 w-56 items-center justify-center gap-[2px]">
          {Array.from({ length: visualizerBars }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-[2px] rounded-full transition-all duration-300",
                isRecording ? "animate-pulse bg-black/40 dark:bg-white/40" : "h-[2px] bg-black/10 dark:bg-white/10"
              )}
              style={
                isRecording && isClient
                  ? {
                      height: `${30 + Math.random() * 70}%`,
                      animationDelay: `${i * 0.02}s`
                    }
                  : undefined
              }
            />
          ))}
        </div>

        {/* Language Selection ToggleGroup */}
        {/*<ToggleGroup*/}
        {/*  type="single"*/}
        {/*  size="sm"*/}
        {/*  value={selectedLanguage}*/}
        {/*  onValueChange={handleLanguageChange}*/}
        {/*  className="mt-4 rounded-full bg-zinc-100/80 p-1 *:rounded-full"*/}
        {/*>*/}
        {/*  <ToggleGroupItem className="data-[state=on]:!bg-white px-3 text-zinc-400 hover:text-black" value="uz-UZ" aria-label="Select Uzbek">*/}
        {/*    Uzbek*/}
        {/*  </ToggleGroupItem>*/}
        {/*  <ToggleGroupItem className="data-[state=on]:!bg-white px-3 text-zinc-400 hover:text-black" value="ru-RU" aria-label="Select Russian">*/}
        {/*    Russian*/}
        {/*  </ToggleGroupItem>*/}
        {/*  <ToggleGroupItem className="data-[state=on]:!bg-white px-3 text-zinc-400 hover:text-black" value="en" aria-label="Select English">*/}
        {/*    English*/}
        {/*  </ToggleGroupItem>*/}
        {/*</ToggleGroup>*/}
      </div>
    </div>
  )
}
