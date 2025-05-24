import { connectToDatabase } from '@/lib/db';
import { Match } from '@/models/Match';

export class MatchRepository {
  constructor() {}

  async saveMatch(board: string[], winner: string) {
    await connectToDatabase();
    return await Match.create({
      board,
      winner,
    });
  }

  async getMatches(limit = 10) {
    await connectToDatabase();
    return await Match.find().sort({ createdAt: -1 }).limit(limit);
  }
}
