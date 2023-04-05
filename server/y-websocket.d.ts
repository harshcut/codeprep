declare module 'y-websocket/bin/utils' {
  import type { WebSocket } from 'ws'
  import type { Request } from 'express'

  export function setupWSConnection(
    ws: WebSocket,
    req: Request,
    options: { docName: string; gc?: boolean }
  ): void
}
