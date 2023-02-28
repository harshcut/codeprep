import type { Session } from 'next-auth'

const getSession = async (cookie: string): Promise<Session> => {
  const session = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie },
  }).then((res) => res.json())
  return Object.keys(session).length > 0 ? session : null
}

export default getSession
