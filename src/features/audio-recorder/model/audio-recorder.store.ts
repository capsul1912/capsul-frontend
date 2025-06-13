import type { ITranscriptObject } from "@/entities/audio/types.ts"
import { create } from "zustand"

type IRecorderType = "chat" | "copilot" | null

export interface IAudioRecorderState {
  isOpenRecorder: boolean
  audioUrl: string | null
  type: IRecorderType
  setOpenRecorder: (isOpen: boolean) => void
  setAudioUrl: (url: string | null) => void
  setOpen: (open: boolean, type?: IRecorderType) => void
  open: boolean
  isTranscribing: boolean
  setIsTranscribing: (isTranscribing: boolean) => void
  transcriptObject: ITranscriptObject | null
  setTranscriptObject: (transcriptObject: ITranscriptObject | null) => void
}

export const useAudioRecorderStore = create<IAudioRecorderState>(set => ({
  isOpenRecorder: true,
  audioUrl: null,
  type: null,
  setOpenRecorder: isOpen => set({ isOpenRecorder: isOpen }),
  setAudioUrl: url => set({ audioUrl: url }),
  setOpen: (open, type = null) => set({ open, type }),
  open: false,
  isTranscribing: false,
  transcriptObject: null,
  setIsTranscribing: isTranscribing => set({ isTranscribing }),
  setTranscriptObject: transcriptObject => set({ transcriptObject })
}))
