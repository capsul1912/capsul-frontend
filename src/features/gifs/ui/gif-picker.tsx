import { type IGiphyGif, fetchGifs } from "@/features/gifs/api/giphy-api.ts"
import { GifIcon } from "@/shared/icons"
import { useClickOutside, useDebounce } from "@/shared/lib/hooks"
import { Button } from "@/shared/ui/button.tsx"
import { Input } from "@/shared/ui/input.tsx"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void
}

export default function GifPicker({ onGifSelect }: GifPickerProps) {
  // Refs
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // States
  const [gifs, setGifs] = useState<IGiphyGif[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [open, setOpen] = useState(false)

  useClickOutside(ref, event => {
    if (buttonRef.current?.contains(event.target as Node)) return
    setOpen(false)
  })

  useEffect(() => {
    const searchGifs = async () => {
      // Renamed for clarity
      if (!debouncedSearchTerm) {
        setGifs([])
        return
      }

      setIsLoading(true)
      setError(null)

      const apiKey = import.meta.env.VITE_GIPHY_API_KEY
      if (!apiKey) {
        setError("GIPHY API key is not set.")
        setIsLoading(false)
        return
      }

      const fetchedGifs = await fetchGifs(debouncedSearchTerm, apiKey) // Call the API function

      setIsLoading(false)

      if (fetchedGifs) {
        setGifs(fetchedGifs)
      } else {
        setError("Failed to load GIFs. Please try again.")
      }
    }

    searchGifs()
  }, [debouncedSearchTerm])

  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="rounded-lg p-2 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setOpen(!open)}
      >
        <GifIcon className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="right0 absolute bottom-12 z-[1000] mx-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <motion.div
              ref={ref}
              className="mx-auto w-[500px] max-w-[500px] space-y-4 rounded-xl border bg-white shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <div className="relative flex gap-2 overflow-hidden border-b border-b-zinc-200">
                <Input
                  type="search"
                  placeholder="Search for gifs..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="rounded-none border-none py-7 pr-10 pl-6"
                />
                {isLoading ? (
                  <Loader2 className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <Search className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <div className="grid max-h-[400px] grid-cols-2 gap-4 overflow-auto p-4 md:grid-cols-4">
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      className="aspect-square animate-pulse rounded-lg bg-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: index * 0.05
                      }}
                    />
                  ))
                ) : error ? (
                  <div className="col-span-full flex items-center justify-center p-8 text-center text-gray-500 text-sm">{error}</div>
                ) : gifs.length === 0 && searchTerm ? (
                  <div className="col-span-full flex items-center justify-center p-8 text-center text-gray-500 text-sm">
                    No GIFs found. Try a different search term.
                  </div>
                ) : gifs.length === 0 ? (
                  <div className="col-span-full flex items-center justify-center p-8 text-center text-gray-500 text-sm">
                    Search for GIFs to get started
                  </div>
                ) : (
                  gifs.map(gif => (
                    <motion.button
                      key={gif.id}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-black/5 transition-all duration-75 hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={() => {
                        onGifSelect(gif.images.fixed_height.url)
                        setOpen(false)
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.img
                        width={200}
                        height={200}
                        src={gif.images.fixed_height.url || "/placeholder.svg"}
                        alt={gif.title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                        loading="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
