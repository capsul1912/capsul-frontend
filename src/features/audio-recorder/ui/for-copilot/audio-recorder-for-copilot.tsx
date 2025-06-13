import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import AudioRecorderUi from "@/features/audio-recorder/ui/for-main-chat/audio-recorder-ui.tsx"
import { PopoverForm, PopoverFormSuccess } from "@/shared/ui/popover-form.tsx"
import { AudioRecordCopilotResult } from "./audio-record-copilot-result.tsx"

export function AudioRecorderForCopilot() {
  const { isOpenRecorder, type, open, setOpen } = useAudioRecorderStore()
  return (
    <>
      <PopoverForm
        title="audio-for-copilot"
        open={open && type === "copilot"}
        setOpen={state => setOpen(state, "copilot")}
        width="460px"
        height="auto"
        wrapperClassName="right-0 left-auto"
        openChild={<div className="flex h-full flex-col p-2">{isOpenRecorder ? <AudioRecorderUi /> : <AudioRecordCopilotResult />}</div>}
        successChild={<PopoverFormSuccess title="Successfully subscribed!" description="Thank you for joining our newsletter." />}
      />
    </>
  )
}
