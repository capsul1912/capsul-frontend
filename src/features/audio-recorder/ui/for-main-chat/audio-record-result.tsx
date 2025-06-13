import { useAudioRecorderLogic } from "@/features/audio-recorder/lib/use-audio-recorder-logic.ts"
import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import { useChatStore } from "@/features/chat/model/chat.store.ts"
import { Button } from "@/shared/ui/button.tsx"
import { Separator } from "@/shared/ui/separator.tsx"
import { TextShimmer } from "@/shared/ui/text-shimmer.tsx"
import { ListCheckIcon, SendIcon, XIcon } from "lucide-react"

interface IProps {
  audioUrl: string | null
}

function AudioRecordResult({ audioUrl }: IProps) {
  // Helpers
  const { handleResetAudioRecorder } = useAudioRecorderLogic()

  // Store
  const { setInputValue } = useChatStore()
  const { setOpen, transcriptObject, isTranscribing } = useAudioRecorderStore()

  const handleTakeToInput = () => {
    if (transcriptObject?.transcript) {
      setInputValue(transcriptObject?.transcript)
    }
    handleResetAudioRecorder()
    setOpen(false)
  }

  const handleAudioRecorderClose = () => {
    handleResetAudioRecorder()
    setOpen(false)
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
        {isTranscribing ? (
          <div className="flex animate-pulse items-center justify-center gap-2 text-gray-500 duration-1000 dark:text-gray-400">
            <TextShimmer
              duration={0.7}
              className="text-lg [--base-color:theme(colors.zinc.400)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
            >
              Transcribing...
            </TextShimmer>
          </div>
        ) : (
          <div className="mr-7">{transcriptObject?.transcript || ""}</div>
        )}
        <div className="mt-2 ml-auto flex items-center gap-2">
          {/*<Button disabled={isTranscribing} variant="secondary"*/}
          {/*        className={'h-11 rounded-full hover:bg-zinc-200 active:bg-zinc-300'}*/}
          {/*        onClick={handleTakeToInput}>*/}
          {/*    Send <SendIcon />*/}
          {/*</Button>*/}
          <Button
            disabled={isTranscribing}
            variant="secondary"
            className={"h-11 rounded-full hover:bg-zinc-200 active:bg-zinc-300 "}
            onClick={handleTakeToInput}
          >
            Take to input <ListCheckIcon />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex flex-1 flex-shrink-0 items-center gap-2 p-4">
        {audioUrl && (
          <audio controls className="h-11 w-full">
            <source src={audioUrl} type="audio/webm" />
            <track kind="captions" src="path-to-captions.vtt" srcLang="en" label="English" default />
            Your browser does not support the audio element.
          </audio>
          // <audio controls className="h-11 w-full">
          //   <source src={audioUrl} type="audio/webm" />
          //   Your browser does not support the audio element.
          // </audio>
        )}
        <Button disabled={isTranscribing} className="ml-auto h-11 rounded-full bg-blue-400 hover:bg-blue-500 active:bg-blue-600 disabled:bg-zinc-400">
          Send audio
          <SendIcon />
        </Button>
      </div>
    </div>
  )
}

export default AudioRecordResult
