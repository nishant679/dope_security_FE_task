import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CharacterTable from "../pages/CharacterTable"

// ✅ mock data
const mockCharacters = [
  { id: "1", name: "Naruto", location: "Konoha", health: "Healthy", power: 9500 },
  { id: "2", name: "Gaara", location: "Suna", health: "Injured", power: 6000 },
]

// ✅ mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ characters: mockCharacters }),
    })
  ) as jest.Mock
})

const queryClient = new QueryClient()
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe("CharacterTable", () => {
  it("renders table with data", async () => {
    render(<CharacterTable />, { wrapper })

    expect(
      await screen.findByPlaceholderText(/Search by name or location.../i)
    ).toBeInTheDocument()

    expect(await screen.findByText(/Naruto/)).toBeInTheDocument()
    expect(await screen.findByText(/Gaara/)).toBeInTheDocument()
  })

  it("filters rows by search query", async () => {
    render(<CharacterTable />, { wrapper })

    const searchInput = await screen.findByPlaceholderText(
      /Search by name or location.../i
    )
    fireEvent.change(searchInput, { target: { value: "Konoha" } })

    await waitFor(() => {
      expect(screen.getByText(/Naruto/)).toBeInTheDocument()
      expect(screen.queryByText(/Gaara/)).not.toBeInTheDocument()
    })
  })

  it("filters rows by health state", async () => {
    render(<CharacterTable />, { wrapper })

    const filterBtn = await screen.findByRole("button")
    fireEvent.click(filterBtn)

    const healthyOption = await screen.findByText("Healthy")
    fireEvent.click(healthyOption)

    await waitFor(() => {
      expect(screen.getByText(/Naruto/)).toBeInTheDocument()
      expect(screen.queryByText(/Gaara/)).not.toBeInTheDocument()
    })
  })

  it("selects rows and logs IDs when marking viewed", async () => {
    console.log = jest.fn()
    render(<CharacterTable />, { wrapper })

    const checkboxes = await screen.findAllByRole("checkbox")
    fireEvent.click(checkboxes[1]) // select Naruto row

    const markViewedBtn = screen.getByRole("button", { name: /submit/i })
    fireEvent.click(markViewedBtn)

    expect(console.log).toHaveBeenCalledWith(["1"])
  })
})
