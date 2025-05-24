import { connectToDatabase } from '@/lib/db';
import Game from '@/models/Game';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const games = await Game.find({});

  return NextResponse.json({ games });
}
