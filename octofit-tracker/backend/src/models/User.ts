import mongoose, { Schema } from 'mongoose'
import { fitnessLevels } from './types.js'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: { type: String, enum: fitnessLevels, default: 'beginner' },
    goals: { type: [String], default: [] },
  },
  { timestamps: true },
)

const User = mongoose.models.User ?? mongoose.model('User', userSchema)

export default User
 
