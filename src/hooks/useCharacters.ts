import { useQuery } from "@tanstack/react-query"

export interface Character {
  id: string
  name: string
  location: "Konoha" | "Suna" | "Kiri" | "Iwa" | "Kumo"
  health: "Healthy" | "Injured" | "Critical"
  power: number
}

export function useCharacters() {
  return useQuery<Character[]>({
    queryKey: ["characters"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/characters")
      if (!res.ok) throw new Error("Failed to fetch characters")
      return res.json()
    },
  })
}
