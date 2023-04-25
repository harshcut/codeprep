import prisma from '@/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import type { NextApiHandler } from 'next'

interface Data {
  error: string | null
  data: Record<string, any> | null
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
  const profile = await prisma.user
    .update({
      where: { id: user.id },
      data: { profile: req.body },
    })
    .then((user) => user.profile)
  return res.status(200).json({ error: null, data: profile })
}

export default handler
