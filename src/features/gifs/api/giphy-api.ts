export interface IGiphyGif {
  id: string
  images: {
    fixed_height: {
      url: string
      width: string
      height: string
    }
  }
  title: string
}

export const fetchGifs = async (searchTerm: string, apiKey: string): Promise<IGiphyGif[] | null> => {
  if (!searchTerm) {
    return [] // Or return null, or throw error, adjust as needed
  }

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=16&offset=0&rating=g&lang=en`
    )

    if (!response.ok) {
      throw new Error("Failed to fetch GIFs")
    }

    const data = await response.json()
    return data.data as IGiphyGif[]
  } catch (error) {
    console.error("Error fetching GIFs:", error)
    return null // Or throw error, adjust as needed
  }
}
