import prisma from '@/prisma'
import { hash } from 'bcrypt'
import type { NextApiHandler } from 'next'
import type { User } from '@prisma/client'

interface Data {
  error: string | null
  data: User | null
}

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed', data: null })
  }
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).json({ error: 'Invalid input data', data: null })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (user) {
    return res.status(409).json({ error: 'User already exists', data: null })
  }
  const data = await prisma.user.create({
    data: { email, password: await hash(password, 12) },
  })
  return res.status(201).json({ error: null, data })
}

export default handler
