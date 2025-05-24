"use client"

import { Square } from "./square"

interface BoardProps {
  squares: (string | null)[]
  onSquareClick: (index: number) => void
  disabled?: boolean
}

export function Board({ squares, onSquareClick, disabled }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => onSquareClick(index)} disabled={disabled} />
      ))}
    </div>
  )
}
