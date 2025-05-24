import TicTacToeGame from "@/components/tic-tac-toe-game"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tic-Tac-Toe vs IA</h1>
          <p className="text-gray-600 dark:text-gray-300">Juega contra nuestra inteligencia artificial</p>
        </div>
        <TicTacToeGame />
      </div>
    </main>
  )
}
