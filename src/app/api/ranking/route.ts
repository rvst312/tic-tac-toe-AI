import { connectToDatabase } from '@/lib/db';
import { Match } from '@/models/Match';
import { NextResponse } from 'next/server';

export async function GETRanking() {
  try {
    await connectToDatabase();
    const matches = await Match.find({});
    
    let playerWins = 0;
    let aiWins = 0;
    let draws = 0;
    
    matches.forEach(match => {
      if (match.winner === 'X') {
        playerWins++;
      } else if (match.winner === 'O') {
        aiWins++;
      } else if (match.winner === 'draw') {
        draws++;
      }
    });
    
    const totalGames = playerWins + aiWins + draws;
    
    const playerWinPercentage = totalGames > 0 ? (playerWins / totalGames) * 100 : 0;
    const aiWinPercentage = totalGames > 0 ? (aiWins / totalGames) * 100 : 0;
    const drawPercentage = totalGames > 0 ? (draws / totalGames) * 100 : 0;
    
    return NextResponse.json({
      totalGames,
      playerWins,
      aiWins,
      draws,
      percentages: {
        player: parseFloat(playerWinPercentage.toFixed(2)),
        ai: parseFloat(aiWinPercentage.toFixed(2)),
        draw: parseFloat(drawPercentage.toFixed(2))
      }
    });
  } catch (error) {
    console.error('Error al obtener rankings:', error);
    return NextResponse.json(
      { error: 'Error al obtener rankings' },
      { status: 500 }
    );
  }
}