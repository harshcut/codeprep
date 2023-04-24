'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { Avatar, Button } from 'ui'
import { Globe, Mail } from 'lucide-react'

export default function DetailsPane() {
  const { data: session } = useSession()
  const [data, setData] = React.useState<Record<string, any>>()
  const email = session?.user?.email

  React.useEffect(() => {
    ;(async () => {
      const { data } = await fetch('/api/profile/read', { next: { revalidate: 0 } }).then((res) =>
        res.json()
      )
      if (!data) return
      setData(data)
    })()
  }, [])

  return (
    <>
      <Avatar className="md:h-auto md:w-auto">
        <Avatar.Image
          src={`https://source.boringavatars.com/marble/120/${email}`}
          draggable={false}
        />
        <Avatar.Fallback>{email?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
      </Avatar>
      {data?.name && (
        <h1 className="text-2xl font-semibold tracking-tight mt-4 mb-2">{data.name}</h1>
      )}
      {data?.bio && <p>{data.bio}</p>}
      <Button className="w-full my-6">Edit Profile</Button>
      <div className="flex flex-col gap-2">
        {data?.location && (
          <p className="flex items-center text-sm">
            <Globe className="mr-2 h-4 w-4" />
            {data.location}
          </p>
        )}
        {email && (
          <p className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4" />
            {email}
          </p>
        )}
      </div>
    </>
  )
}
