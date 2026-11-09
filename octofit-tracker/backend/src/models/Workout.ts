import mongoose, { Schema } from 'mongoose'
import { activityTypes, fitnessLevels } from './types.js'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: { type: String, enum: activityTypes, required: true },
    fitnessLevel: { type: String, enum: fitnessLevels, required: true },
    durationMinutes: { type: Number, min: 1, required: true },
    instructions: { type: [String], default: [] },
  },
  { timestamps: true },
)

workoutSchema.index({ title: 1, fitnessLevel: 1 }, { unique: true })

const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema)

export default Workout
 
