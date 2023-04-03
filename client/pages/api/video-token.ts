import twilio from 'twilio'
import type { NextApiHandler } from 'next'

const apiKeySid = process.env.TWILIO_API_KEY_SID as string
const apiSecret = process.env.TWILIO_API_SECRET as string
const accountSid = process.env.TWILIO_ACCOUNT_SID as string

const AccessToken = twilio.jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant

interface Data {
  token: string | null
  error: any | null
}

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed', token: null })
  }
  const { identity, room } = req.body
  if (!identity || !room) {
    return res.status(400).json({ error: 'Missing identity or room arguments', token: null })
  }
  const token = new AccessToken(accountSid, apiKeySid, apiSecret, { identity })
  const videoGrant = new VideoGrant({ room })
  token.addGrant(videoGrant)
  return res.status(200).json({ error: null, token: token.toJwt() })
}

export default handler
