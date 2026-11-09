import mongoose, { Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, min: 0, required: true, default: 0 },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
  },
  { timestamps: true },
)

leaderboardSchema.index(
  { user: 1, team: 1, periodStart: 1, periodEnd: 1 },
  { unique: true },
)

const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema)

export default Leaderboard
 
