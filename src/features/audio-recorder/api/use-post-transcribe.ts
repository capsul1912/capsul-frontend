import { postTranscribe } from "@/entities/audio/api/post-transcribe.ts"
import { useMutation } from "@tanstack/react-query"

export const usePostTranscribe = () => {
  return useMutation({
    mutationFn: (b: Blob) => postTranscribe(b),
    onSuccess: a => {
      console.log(a)
    }
    // onError: error => {
    //     console.error("Error posting :", error)
    // }
  })
}
