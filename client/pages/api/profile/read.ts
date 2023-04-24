import prisma from '@/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import type { NextApiHandler } from 'next'

interface Data {
  error: any | null
  data: any | null
}

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed', data: null })
  }
  const session = await getServerSession(req, res, authOptions)
  const user = await prisma.user.findUnique({ where: { email: session?.user?.email ?? undefined } })
  if (!session || !user) {
    return res.status(401).json({ error: 'Client must be logged in', data: null })
  }
  return res.status(200).json({ error: null, data: user.profile })
}

export default handler
