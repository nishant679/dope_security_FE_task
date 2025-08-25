import { create } from "zustand"

interface CharacterUIState {
  selectedIds: Set<string>
  viewedIds: Set<string>
  healthFilter: string[] // ["Healthy", "Injured"]
  searchQuery: string
  sortOrder: "asc" | "desc" | null

  toggleSelect: (id: string) => void
  clearSelection: () => void
  toggleViewed: (ids: string[]) => void
  markViewed: (ids: string[]) => void
  markUnviewed: (ids: string[]) => void
  setHealthFilter: (filters: string[]) => void
  setSearchQuery: (q: string) => void
  toggleSortOrder: () => void
  setSelectedIds: (ids: Set<string>) => void
}

export const useCharacterStore = create<CharacterUIState>((set, get) => ({
  selectedIds: new Set(),
  viewedIds: new Set(),
  healthFilter: [],
  searchQuery: "",
  sortOrder: null,

  toggleSelect: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return { selectedIds: newSet }
    }),

  clearSelection: () => set({ selectedIds: new Set() }),

  // Toggle (add/remove) viewed state for given ids
  toggleViewed: (ids) =>
    set((state) => {
      const newViewed = new Set(state.viewedIds)
      ids.forEach((id) => {
        newViewed.has(id) ? newViewed.delete(id) : newViewed.add(id)
      })
      return { viewedIds: newViewed, selectedIds: new Set() }
    }),

  // Explicit mark as viewed
  markViewed: (ids) =>
    set((state) => {
      const newViewed = new Set(state.viewedIds)
      ids.forEach((id) => newViewed.add(id))
      return { viewedIds: newViewed, selectedIds: new Set() }
    }),

  // Explicit mark as unviewed
  markUnviewed: (ids) =>
    set((state) => {
      const newViewed = new Set(state.viewedIds)
      ids.forEach((id) => newViewed.delete(id))
      return { viewedIds: newViewed, selectedIds: new Set() }
    }),

  setHealthFilter: (filters) => set({ healthFilter: filters }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleSortOrder: () =>
    set((state) => {
      if (state.sortOrder === "asc") return { sortOrder: "desc" }
      if (state.sortOrder === "desc") return { sortOrder: null }
      return { sortOrder: "asc" }
    }),
  setSelectedIds: (ids: Set<string>) => set({ selectedIds: ids }),
}))
