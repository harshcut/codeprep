import dotenv from 'dotenv'
import expressWs from 'express-ws'
import express from 'express'
import { setupWSConnection } from 'y-websocket/bin/utils'

dotenv.config()
const port = process.env.PORT || 4000

const { app } = expressWs(express())

app.ws('/collaboration/:document', (ws, req) => {
  setupWSConnection(ws, req, { docName: req.params.document })
})

app.get('/', (_, res) => {
  res.json({ source: 'https://github.com/harshcut/codeprep' })
})

app.listen(port, () => {
  console.info(`ready - started express server on http://localhost:${port}`)
})
