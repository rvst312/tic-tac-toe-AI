"use client"

import { Button } from "@/components/ui/button"

interface SquareProps {
  value: string | null
  onClick: () => void
  disabled?: boolean
}

export function Square({ value, onClick, disabled }: SquareProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-20 h-20 text-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {value && <span className={value === "X" ? "text-blue-600" : "text-red-600"}>{value}</span>}
    </Button>
  )
}
