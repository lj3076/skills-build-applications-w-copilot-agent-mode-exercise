import mongoose, { Schema } from 'mongoose'
import { activityTypes } from './types.js'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: activityTypes, required: true },
    durationMinutes: { type: Number, min: 1, required: true },
    distanceKm: { type: Number, min: 0, default: 0 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema)

export default Activity
