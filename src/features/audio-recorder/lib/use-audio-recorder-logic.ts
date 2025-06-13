import { usePostTranscribe } from "@/features/audio-recorder/api/use-post-transcribe.ts"
import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import { useCallback, useRef } from "react"

export function useAudioRecorderLogic() {
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Store
  const { setAudioUrl, setOpenRecorder, setTranscriptObject, setIsTranscribing } = useAudioRecorderStore()

  // Queries
  const { mutateAsync: sendToTranscribe } = usePostTranscribe()

  // Functions
  const handleStartRecording = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("MediaDevices API is not supported on this browser.")
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      let options = { mimeType: "audio/webm;codecs=opus" }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) options = { mimeType: "audio/webm" }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) options = { mimeType: "" }

      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.start(1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }, [])

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm"
          })
          const audioUrl = URL.createObjectURL(audioBlob)
          setIsTranscribing(true)
          sendToTranscribe(audioBlob)
            .then(data => {
              setIsTranscribing(false)
              setTranscriptObject(data)
              setAudioUrl(audioUrl)
            })
            .finally(() => {
              setIsTranscribing(false)
            })
        } else {
          console.error("No audio chunks recorded.")
        }

        audioChunksRef.current = [] // Clear recorded chunks
      }

      mediaRecorderRef.current.stop()
    }
    setOpenRecorder(false)
  }, [])

  const handleResetAudioRecorder = useCallback(() => {
    audioChunksRef.current = []
    mediaRecorderRef.current = null
    setOpenRecorder(true)
    setAudioUrl("")
  }, [])

  return {
    handleStartRecording,
    handleStopRecording,
    handleResetAudioRecorder
  }
}
