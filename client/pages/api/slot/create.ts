import prisma from '@/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
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
  const session = await getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? undefined } })
  if (!session || !user) {
    return res.status(401).json({ error: 'Client must be logged in', data: null })
  }
  const { timestamp } = req.body
  const slot = await prisma.slot.findUnique({ where: { timestamp } })
  if (!slot) {
    const newSlot = await prisma.slot.create({
      data: { timestamp, userIDs: { set: user.id } },
    })
    return res.status(200).json({ error: null, data: newSlot.timestamp.toISOString() })
  }
  if (slot.userIDs.includes(user.id)) {
    return res.status(400).json({ error: 'User already in slot', data: null })
  }
  const newSlot = await prisma.slot.update({
    where: { timestamp },
    data: { userIDs: { push: user.id } },
  })
  return res.status(200).json({ error: null, data: newSlot.timestamp.toISOString() })
}

export default handler
