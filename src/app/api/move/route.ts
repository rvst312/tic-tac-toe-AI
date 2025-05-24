import { GameService } from '@/services/gameService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { board, currentPlayer } = await request.json();

    const isInvalidBoard =
      !board || !Array.isArray(board) || board.length !== 9;
    if (isInvalidBoard) {
      return NextResponse.json({ error: 'Invalid Board' }, { status: 400 });
    }

    const isInvalidPlayer = currentPlayer !== 'X' && currentPlayer !== 'O';
    if (isInvalidPlayer) {
      return NextResponse.json({ error: 'Invalid Player' }, { status: 400 });
    }

    const gameService = new GameService();
    const result = await gameService.processMove(board, currentPlayer);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/move:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
