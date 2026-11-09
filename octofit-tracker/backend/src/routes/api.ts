import { Router } from 'express'
import Activity from '../models/Activity.js'
import Leaderboard from '../models/Leaderboard.js'
import Team from '../models/Team.js'
import User from '../models/User.js'
import Workout from '../models/Workout.js'
import { fitnessLevels } from '../models/types.js'

const router = Router()
const port = 8000
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`
  : `http://localhost:${port}`

router.get('/', (_request, response) => {
  response.json({
    baseUrl,
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
      recommendations: '/api/recommendations/:userId',
    },
  })
})

router.get('/health', (_request, response) => {
  response.json({ status: 'ok', database: 'connected', baseUrl })
})

router.get('/users', async (_request, response) => {
  const users = await User.find().sort({ name: 1 })
  response.json(users)
})

router.post('/users', async (request, response) => {
  const user = await User.create(request.body)
  response.status(201).json(user)
})

router.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (!user) {
    response.status(404).json({ error: 'User not found' })
    return
  }
  response.json(user)
})

router.patch('/users/:id', async (request, response) => {
  const user = await User.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      email: request.body.email,
      fitnessLevel: request.body.fitnessLevel,
      goals: request.body.goals,
    },
    { returnDocument: 'after', runValidators: true },
  )
  if (!user) {
    response.status(404).json({ error: 'User not found' })
    return
  }
  response.json(user)
})

router.get('/teams', async (_request, response) => {
  const teams = await Team.find().populate('members', 'name').sort({ name: 1 })
  response.json(teams)
})

router.post('/teams', async (request, response) => {
  const team = await Team.create(request.body)
  response.status(201).json(team)
})

router.patch('/teams/:id', async (request, response) => {
  const team = await Team.findByIdAndUpdate(
    request.params.id,
    {
      name: request.body.name,
      description: request.body.description,
      members: request.body.members,
    },
    { returnDocument: 'after', runValidators: true },
  ).populate('members', 'name')
  if (!team) {
    response.status(404).json({ error: 'Team not found' })
    return
  }
  response.json(team)
})

router.get('/activities', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'name')
    .sort({ recordedAt: -1 })
  response.json(activities)
})

router.post('/activities', async (request, response) => {
  const activity = await Activity.create(request.body)
  response.status(201).json(activity)
})

router.get('/leaderboard', async (_request, response) => {
  const entries = await Leaderboard.find()
    .populate('user', 'name')
    .populate('team', 'name')
    .sort({ points: -1, updatedAt: 1 })
  response.json(entries)
})

router.post('/leaderboard', async (request, response) => {
  const entry = await Leaderboard.create(request.body)
  response.status(201).json(entry)
})

router.get('/workouts', async (request, response) => {
  const filter: { fitnessLevel?: (typeof fitnessLevels)[number] } = {}
  const requestedLevel = request.query.fitnessLevel
  if (requestedLevel !== undefined) {
    const fitnessLevel = typeof requestedLevel === 'string'
      ? fitnessLevels.find((level) => level === requestedLevel)
      : undefined
    if (!fitnessLevel) {
      response.status(400).json({ error: `fitnessLevel must be one of: ${fitnessLevels.join(', ')}` })
      return
    }
    filter.fitnessLevel = fitnessLevel
  }

  const workouts = await Workout.find(filter).sort({ fitnessLevel: 1, title: 1 })
  response.json(workouts)
})

router.post('/workouts', async (request, response) => {
  const workout = await Workout.create(request.body)
  response.status(201).json(workout)
})

router.get('/recommendations/:userId', async (request, response) => {
  const user = await User.findById(request.params.userId)
  if (!user) {
    response.status(404).json({ error: 'User not found' })
    return
  }
  const workouts = await Workout.find({ fitnessLevel: user.fitnessLevel }).sort({ title: 1 })
  response.json({ userId: user.id, fitnessLevel: user.fitnessLevel, workouts })
})

export default router
