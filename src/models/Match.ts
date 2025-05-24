// models/Match.ts
import { Schema, model, models } from 'mongoose';

const MatchSchema = new Schema(
  {
    board: {
      type: [String],
      required: true,
      validate: [
        (arr: string[]) => arr.length === 9,
        'Board must have 9 cells',
      ],
    },
    winner: {
      type: String,
      enum: ['X', 'O', 'draw'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Match = models.Match || model('Match', MatchSchema);
