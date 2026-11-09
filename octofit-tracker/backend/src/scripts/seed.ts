import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const userProfiles = await Promise.all([
      User.findOneAndUpdate(
        { email: 'alex@example.com' },
        { name: 'Alex Morgan', fitnessLevel: 'beginner', goals: ['Build a daily routine'] },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      User.findOneAndUpdate(
        { email: 'sam@example.com' },
        { name: 'Sam Rivera', fitnessLevel: 'intermediate', goals: ['Improve endurance'] },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
    ]);
    const [alex, sam] = userProfiles;

    const team = await Team.findOneAndUpdate(
      { name: 'Trail Blazers' },
      { description: 'A team focused on consistent outdoor activity.', members: [alex._id, sam._id] },
      { upsert: true, returnDocument: 'after', runValidators: true },
    );

    const periodStart = new Date('2026-01-01T00:00:00.000Z');
    const periodEnd = new Date('2026-12-31T23:59:59.999Z');
    await Promise.all([
      Activity.findOneAndUpdate(
        { user: alex._id, type: 'walking', recordedAt: new Date('2026-11-08T08:00:00.000Z') },
        {
          durationMinutes: 35,
          distanceKm: 2.8,
          caloriesBurned: 145,
          recordedAt: new Date('2026-11-08T08:00:00.000Z'),
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      Activity.findOneAndUpdate(
        { user: sam._id, type: 'running', recordedAt: new Date('2026-11-08T07:30:00.000Z') },
        {
          durationMinutes: 42,
          distanceKm: 6.2,
          caloriesBurned: 390,
          recordedAt: new Date('2026-11-08T07:30:00.000Z'),
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      Leaderboard.findOneAndUpdate(
        { user: alex._id, team: team._id, periodStart, periodEnd },
        { points: 145 },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      Leaderboard.findOneAndUpdate(
        { user: sam._id, team: team._id, periodStart, periodEnd },
        { points: 390 },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      Workout.findOneAndUpdate(
        { title: 'Starter Walk', fitnessLevel: 'beginner' },
        {
          description: 'A gentle walk to build a consistent movement habit.',
          activityType: 'walking',
          durationMinutes: 20,
          instructions: ['Walk at a comfortable pace.', 'Finish with a light stretch.'],
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
      Workout.findOneAndUpdate(
        { title: 'Endurance Run', fitnessLevel: 'intermediate' },
        {
          description: 'A steady run focused on aerobic endurance.',
          activityType: 'running',
          durationMinutes: 35,
          instructions: ['Warm up for five minutes.', 'Keep a conversational pace.'],
        },
        { upsert: true, returnDocument: 'after', runValidators: true },
      ),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
 
