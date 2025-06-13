import { useAudioRecorderLogic } from "@/features/audio-recorder/lib/use-audio-recorder-logic.ts"
import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import { AIVoiceInput } from "@/shared/ui/ai-voice-input.tsx"
import { XIcon } from "lucide-react"

function AudioRecorderUi() {
  const { setOpen, type } = useAudioRecorderStore()
  const { handleStartRecording, handleStopRecording } = useAudioRecorderLogic()

  return (
    <div onClick={() => setOpen(false, type)}>
      <div className="relative rounded-xl bg-white p-8 dark:bg-black" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setOpen(false, type)}
          className="group absolute top-1 right-1 rounded-md bg-zinc-50 p-2 text-black/50 hover:bg-zinc-100 hover:text-black active:bg-zinc-50 dark:text-white/50 dark:hover:text-white"
        >
          <XIcon className="stroke-zinc-400 group-hover:stroke-zinc-500" />
        </button>
        <AIVoiceInput onStart={handleStartRecording} onStop={handleStopRecording} />
      </div>
    </div>
  )
}

export default AudioRecorderUi
