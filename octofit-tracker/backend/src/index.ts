import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = 8000
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${port}.app.github.dev`
  : `http://localhost:${port}`

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found' })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({ error: 'Request body must be valid JSON' })
    return
  }

  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message })
    return
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    response.status(409).json({ error: 'A record with the same unique value already exists' })
    return
  }

  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
})

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening at ${baseUrl}`)
    })
  } catch (error) {
    console.error('Error connecting to octofit_db:', error)
    process.exitCode = 1
  }
}

void startServer()