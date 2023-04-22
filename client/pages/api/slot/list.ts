import prisma from '@/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import type { NextApiHandler } from 'next'

interface Data {
  error: string | null
  data: string[] | null
}

const handler: NextApiHandler<Data> = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? undefined } })
  if (!session || !user) {
    return res.status(401).json({ error: 'Client must be logged in', data: null })
  }
  const slots = await prisma.slot
    .findMany({ where: { userIDs: { has: user.id } } })
    .then((slot) => slot.map(({ timestamp }) => timestamp.toISOString()))
  return res.status(200).json({ error: null, data: slots })
}

export default handler
