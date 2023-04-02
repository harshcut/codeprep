import type { Session } from 'next-auth'

const getSession = async (cookie: string): Promise<Session> => {
  const session = await fetch(`http://localhost:3000/api/auth/session`, {
    headers: { cookie },
  }).then((res) => res.json())
  return Object.keys(session).length > 0 ? session : null
}

export default getSession
