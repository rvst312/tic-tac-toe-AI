// src/models/Game.ts
import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  board: [[String]],
  currentPlayer: String,
  winner: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);