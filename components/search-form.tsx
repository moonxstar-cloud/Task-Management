"use client"

import { Search } from "lucide-react"

export function SearchForm() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm w-full focus:outline-none"
      />
    </div>
  )
}
