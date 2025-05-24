import { MatchRepository } from '@/repositories/matchRepository';
import TicTacToeEngine, { Player } from 'tic-tac-toe-minimax-engine';

export class GameService {
  private matchRepository: MatchRepository;
  private engine: TicTacToeEngine;

  constructor() {
    this.matchRepository = new MatchRepository();
    // RUN ENGINE
    this.engine = new TicTacToeEngine(Player.PLAYER_ONE);
  }

  /**
   * Processes the next move in the game
   * @param board - Current state of the game board as an array
   * @param currentPlayer - Symbol of the current player ('X' or 'O')
   * @returns Object containing the updated board, winner (if any), and index of the move made
   */
  async processMove(board: string[], currentPlayer: string) {
    // Check winner before making a move
    let winner = this.checkWinner(board);

    if (!winner) {
      const moveIndex = this.getNextMove(board, currentPlayer);

      const isValidMove = moveIndex !== -1;
      if (isValidMove) {
        const newBoard = [...board];
        newBoard[moveIndex] = currentPlayer;

        // Check winner after making a move
        winner = this.checkWinner(newBoard);

        // Save result if there is a winner or draw
        if (winner) {
          await this.matchRepository.saveMatch(newBoard, winner);
        }

        return {
          board: newBoard,
          winner,
          moveIndex,
        };
      }
    } else {
      // If there is a winner, save the result
      await this.matchRepository.saveMatch(board, winner);
    }

    return {
      board,
      winner,
      moveIndex: -1, // No valid move
    };
  }
  /**
   * Checks if there is a winner or a draw in the current board state
   * @param board - Array representing the game board
   * @returns The winning player's symbol ('X' or 'O'), 'draw' if game is tied, or null if game is still ongoing
   */
  checkWinner(board: string[]): string | null {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns

      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    // Check all possible winning combinations
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const currentPosition = board[a];
      const isWinningLine =
        currentPosition &&
        currentPosition === board[b] &&
        currentPosition === board[c];

      if (isWinningLine) {
        return currentPosition;
      }
    }

    // Check for draw - when no empty spaces remain
    const checkDraw = !board.includes('');

    if (checkDraw) {
      return 'draw';
    }

    return null;
  }

  // Method to get the next move using the
  // tic-tac-toe-minimax-engine library
  getNextMove(board: string[], currentPlayer: string): number {
    const boardMatrix = this.convertToMatrix(board);
    
    this.resetEngineWithBoard(boardMatrix, currentPlayer);
    
    // Obtein best move from the engine
    const { x, y } = this.engine.getBestMove();
    
    return y * 3 + x;
  }
  
  private convertToMatrix(board: string[]): string[][] {
    const matrix: string[][] = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      matrix[row][col] = board[i];
    }
    
    return matrix;
  }
  
  private resetEngineWithBoard(boardMatrix: string[][], currentPlayer: string) {
    this.engine = new TicTacToeEngine(
      currentPlayer === 'X' ? Player.PLAYER_ONE : Player.PLAYER_TWO
    );
    
    // Register all existing moves in the game engine
    // Iterate through the board matrix and make moves for non-empty cells
    // This synchronizes the engine's internal state with the current game board
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (boardMatrix[y][x] !== '') {
          this.engine.makeNextMove(x, y);
        }
      }
    }
  }
}
