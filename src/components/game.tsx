"use client"

import { useState } from "react"
import { Board } from "./board"

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = "Go to game start"
    }
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className={`px-3 py-1 rounded text-sm ${
            move === currentMove
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          }`}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
      <div className="flex-1 flex justify-center">
        <Board squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Game History</h2>
          <ol className="list-decimal list-inside">{moves}</ol>
        </div>
      </div>
    </div>
  )
}
