import { useAudioRecorderLogic } from "@/features/audio-recorder/lib/use-audio-recorder-logic.ts"
import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import { Button } from "@/shared/ui/button.tsx"
import { ListCheckIcon, SendIcon, XIcon } from "lucide-react"

export function AudioRecordCopilotResult() {
  // Helpers
  const { handleResetAudioRecorder } = useAudioRecorderLogic()

  // Store
  const { setOpen, type, transcriptObject } = useAudioRecorderStore()

  // Functions
  const handleTakeToInput = () => {
    handleResetAudioRecorder()
    setOpen(false, type)
  }

  const handleAudioRecorderClose = () => {
    handleResetAudioRecorder()
    setOpen(false, type)
  }

  return (
    <div>
      <button
        onClick={handleAudioRecorderClose}
        className="group absolute top-3 right-3 rounded-md bg-zinc-50 p-2 text-black/50 hover:bg-zinc-100 hover:text-black active:bg-zinc-50 dark:text-white/50 dark:hover:text-white"
      >
        <XIcon className="stroke-zinc-400 group-hover:stroke-zinc-500" />
      </button>
      <div className="mt-2 flex flex-grow flex-col gap-2 p-4">
        <div className="mr-7">{transcriptObject?.transcript}</div>
        <div className="mt-2 ml-auto flex items-center gap-2">
          <Button variant="secondary" className={"h-11 rounded-full hover:bg-blue-600 active:bg-blue-700"} onClick={handleTakeToInput}>
            Send <SendIcon />
          </Button>
          <Button className={"h-11 rounded-full hover:bg-zinc-300 active:bg-zinc-400 "} onClick={handleTakeToInput}>
            Take to input <ListCheckIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
