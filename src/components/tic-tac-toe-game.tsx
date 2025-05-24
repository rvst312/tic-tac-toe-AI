"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RotateCcw, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { Board } from "./board"
import { RankingTable } from "./ranking-table"

interface GameStats {
  player: { wins: number; draws: number; losses: number }
  ai: { wins: number; draws: number; losses: number }
}

export default function TicTacToeGame() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState<"playing" | "finished" | "draw">("playing")
  const [winner, setWinner] = useState<string | null>(null)
  const [ranking, setRanking] = useState<GameStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchRanking()
  }, [])

  const fetchRanking = async () => {
    try {
      const response = await fetch("/api/ranking")
      const data = await response.json()
      setRanking(data)
    } catch (error) {
      console.error("Error fetching ranking:", error)
    }
  }

  const handlePlayerMove = async (index: number) => {
    if (squares[index] || gameStatus !== "playing" || !isPlayerTurn || isLoading) {
      return
    }

    const newSquares = [...squares]
    newSquares[index] = "X"
    setSquares(newSquares)
    setIsPlayerTurn(false)
    setIsLoading(true)

    try {
      const response = await fetch("/api/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ squares: newSquares, isPlayerTurn: false }),
      })

      const data = await response.json()

      setSquares(data.squares)
      setGameStatus(data.gameStatus)
      setWinner(data.winner)
      setIsPlayerTurn(data.nextTurn === "player")

      // Actualizar ranking si el juego terminó
      if (data.gameStatus === "finished" || data.gameStatus === "draw") {
        await fetchRanking()
      }
    } catch (error) {
      console.error("Error making move:", error)
      setIsPlayerTurn(true) // Restaurar turno en caso de error
    } finally {
      setIsLoading(false)
    }
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setIsPlayerTurn(true)
    setGameStatus("playing")
    setWinner(null)
  }

  const getStatusMessage = () => {
    if (gameStatus === "finished") {
      return winner === "X" ? "¡Ganaste!" : "¡La IA ganó!"
    }
    if (gameStatus === "draw") {
      return "¡Empate!"
    }
    if (isLoading) {
      return "IA pensando..."
    }
    return isPlayerTurn ? "Tu turno (X)" : "Turno de la IA (O)"
  }

  const getStatusVariant = () => {
    if (gameStatus === "finished") {
      return winner === "X" ? "default" : "destructive"
    }
    return "default"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Tablero de juego */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              Tablero de Juego
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant={getStatusVariant()}>
              <AlertDescription className="text-center font-medium">{getStatusMessage()}</AlertDescription>
            </Alert>

            <div className="flex justify-center">
              <Board
                squares={squares}
                onSquareClick={handlePlayerMove}
                disabled={!isPlayerTurn || gameStatus !== "playing" || isLoading}
              />
            </div>

            {(gameStatus === "finished" || gameStatus === "draw") && (
              <div className="flex justify-center">
                <Button onClick={resetGame} size="lg" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Nuevo Juego
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ranking */}
      <div className="lg:col-span-1">
        <RankingTable ranking={ranking} />
      </div>
    </div>
  )
}
