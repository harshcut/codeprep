import { langData } from '@/utils'
import type { NextApiHandler } from 'next'

interface Data {
  error: string | null
  data: string | null
}

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed', data: null })
  }
  const { script, stdin, language } = req.body
  if (!script || !language) {
    return res.status(400).json({ error: 'Missing script or language features', data: null })
  }
  const output = await fetch('https://api.jdoodle.com/v1/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script,
      stdin,
      language,
      versionIndex: langData[language]?.versionIndex ?? '0',
    }),
  }).then((res) => res.json())
  if (output.statusCode === 200) {
    return res.status(200).json({ error: null, data: output.output })
  }
  return res.status(output.statusCode).json({ error: output.error, data: null })
}

export default handler
