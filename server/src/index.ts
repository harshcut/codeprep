import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const port = process.env.PORT || 4000

const app = express()

app.get('/', (_, res) => {
  res.json({ source: 'https://github.com/harshcut/codeprep' })
})

app.listen(port, () => {
  console.info(`ready - started express server on http://localhost:${port}`)
})
