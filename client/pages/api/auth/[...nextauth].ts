import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma'
import { compare } from 'bcrypt'
import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null
        const { email, password } = credentials
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null
        const valid = await compare(password, user.password)
        return valid ? user : null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
}

export default NextAuth(authOptions)
