import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Bot, User } from "lucide-react"

interface GameStats {
  player: { wins: number; draws: number; losses: number }
  ai: { wins: number; draws: number; losses: number }
}

interface RankingTableProps {
  ranking: GameStats | null
}

export function RankingTable({ ranking }: RankingTableProps) {
  if (!ranking) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Estadísticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center">Cargando estadísticas...</p>
        </CardContent>
      </Card>
    )
  }

  const totalGames = ranking.player.wins + ranking.player.draws + ranking.player.losses

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Estadísticas del Juego
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <Badge variant="outline" className="text-sm">
              Total de partidas: {totalGames}
            </Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Jugador</TableHead>
                <TableHead className="text-center">Victorias</TableHead>
                <TableHead className="text-center">Empates</TableHead>
                <TableHead className="text-center">Derrotas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    Tú
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {ranking.player.wins}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{ranking.player.draws}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive">{ranking.player.losses}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-red-600" />
                    IA
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {ranking.ai.wins}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{ranking.ai.draws}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="destructive">{ranking.ai.losses}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {totalGames > 0 && (
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                Tasa de victoria:{" "}
                <span className="font-semibold">{((ranking.player.wins / totalGames) * 100).toFixed(1)}%</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
