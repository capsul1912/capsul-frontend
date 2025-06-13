import { useAudioRecorderStore } from "@/features/audio-recorder/model/audio-recorder.store.ts"
import AudioRecordResult from "@/features/audio-recorder/ui/for-main-chat/audio-record-result.tsx"
import AudioRecorderUi from "@/features/audio-recorder/ui/for-main-chat/audio-recorder-ui.tsx"
import { PopoverForm, PopoverFormSuccess } from "@/shared/ui/popover-form.tsx"

export function AudioRecorder() {
  const { isOpenRecorder, setOpen, open, type, audioUrl } = useAudioRecorderStore()

  return (
    <PopoverForm
      title=""
      open={open && type === "chat"}
      setOpen={state => setOpen(state, "chat")}
      width="460px"
      height="auto"
      openChild={<div className="flex h-full flex-col p-2">{isOpenRecorder ? <AudioRecorderUi /> : <AudioRecordResult audioUrl={audioUrl} />}</div>}
      successChild={<PopoverFormSuccess title="Successfully recorded!" description="Your audio has been saved." />}
    />
  )
}
