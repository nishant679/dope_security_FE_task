import { useCharacterStore } from "../store/useCharacterStore"
import { useCharacters } from "../hooks/useCharacters"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/components/ui/table"
import { Checkbox } from "../components/components/ui/checkbox"
import { Button } from "../components/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/components/ui/dropdown-menu"
import { Input } from "../components/components/ui/input"
import { Badge } from "../components/components/ui/badge"
import { ChevronUp, ChevronDown, Filter } from "lucide-react"
import { PowerBar } from "../components/PowerBar"

export default function CharacterTable() {
  const { data, isLoading, error } = useCharacters()
  const {
    selectedIds,
    toggleSelect,
    clearSelection,
    viewedIds,
    toggleViewed,
    healthFilter,
    setHealthFilter,
    searchQuery,
    setSearchQuery,
    sortOrder,
    toggleSortOrder,
    markUnviewed,
    markViewed,
    setSelectedIds,

  } = useCharacterStore()
  

  if (isLoading) return <p className="p-4">Loading characters...</p>
  if (error) return <p className="p-4 text-red-500">Error loading data</p>
  if (!data) return null

  // --- Filtering + searching ---
  let filtered = data
  if (searchQuery) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  if (healthFilter.length > 0) {
    filtered = filtered.filter((c) => healthFilter.includes(c.health))
  }

  // --- Sorting ---
  if (sortOrder) {
    filtered = [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.power - b.power : b.power - a.power
    )
  }

  // --- Actions ---
  const handleMarkViewed = () => {
    console.log("Selected IDs:", Array.from(selectedIds))
    toggleViewed(Array.from(selectedIds))
    clearSelection()
  }

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      {/* Toolbar */}

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />

        <div className="flex gap-2">

          <Button
            onClick={() => markViewed(Array.from(selectedIds))}
            disabled={selectedIds.size === 0}
            className="bg-green-600 text-white"
          >
            Mark Viewed
          </Button>
          <Button
            onClick={() => markUnviewed(Array.from(selectedIds))}
            disabled={selectedIds.size === 0}
            className="bg-gray-500 text-white"
          >
            Mark Unviewed
          </Button>
          

          {/* Mark Viewed Button */}
          <Button
            onClick={handleMarkViewed}
            disabled={selectedIds.size === 0}
            className="bg-black text-white "
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="my-4 max-h-screen">
        <TableHeader>
          <TableRow className="bg-black text-white mt-4 border-b border-gray-200">
            {/* <TableHead className="w-[50px]">Select</TableHead> */}
            <TableHead className="sticky top-0 z-10 border-r border-gray-100 w-[50px]">

              <Checkbox
                checked={
                  filtered.length > 0 &&
                  filtered.every((row) => selectedIds.has(row.id))
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    // Select all filtered rows
                    const allIds = filtered.map((row) => row.id)
                    setSelectedIds(new Set(allIds))
                  } else {
                    // Deselect all filtered rows
                    setSelectedIds(new Set())
                  }
                }}
              />
            </TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>

            {/* Health Column with Filter */}
            <TableHead>
              <div className="flex items-center gap-2">
                <span>Health</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-md">
                    {["Healthy", "Injured", "Critical"].map((h) => (
                      <DropdownMenuCheckboxItem
                        key={h}
                        checked={healthFilter.includes(h)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setHealthFilter([...healthFilter, h])
                          } else {
                            setHealthFilter(healthFilter.filter((f) => f !== h))
                          }
                        }}
                      >
                        {h}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableHead>

            {/* Power Column with Sort */}
            <TableHead
              className="cursor-pointer select-none flex items-center gap-1"
              onClick={toggleSortOrder}
            >
              Power
              {sortOrder === "asc" && <ChevronUp size={16} />}
              {sortOrder === "desc" && <ChevronDown size={16} />}
            </TableHead>
          </TableRow>
        </TableHeader>


        <TableBody>
          {filtered.map((row) => {
            const isViewed = viewedIds.has(row.id)
            return (
              <TableRow
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  isViewed ? "bg-gray-50 text-gray-400 italic" : ""
                }`}
              >
                <TableCell className="border-r border-gray-100">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onCheckedChange={() => toggleSelect(row.id)}
                  />
                </TableCell>

                <TableCell className="border-r border-gray-100 font-medium">
                  {row.name}
                </TableCell>

                <TableCell className="border-r border-gray-100">{row.location}</TableCell>

                <TableCell className="border-r border-gray-100">
                  {row.health === "Healthy" && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Healthy
                    </Badge>
                  )}
                  {row.health === "Injured" && (
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Injured
                    </Badge>
                  )}
                  {row.health === "Critical" && (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      Critical
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="border-r border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-sm">{row.power}</span>
                    <PowerBar value={row.power} />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>


      </Table>
    </div>
  )
}
