import Pusher from 'pusher'
import {
  AuthorizeChannelResponse,
  PresenceDataOptions,
} from '../../../socket.type'
import { Provider } from '../provider'

export class PusherProvider implements Provider {
  private client: Pusher

  constructor() {
    this.initialise()
  }

  isActive(): boolean {
    if (this.client) {
      return true
    } else {
      return false
    }
  }

  private initialise(): void {
    console.log('Pusher Initialization...')

    try {
      const appId = process.env.PUSHER_APP_ID
      const key = process.env.PUSHER_KEY
      const secret = process.env.PUSHER_SECRET
      const cluster = process.env.PUSHER_CLUSTER

      if (!appId || !key || !secret || !cluster) {
        throw new Error(
          'Set PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, PUSHER_CLUSTER in your .env to activate',
        )
      }

      this.client = new Pusher({
        appId,
        key,
        secret,
        cluster,
        useTLS: true,
      })

      console.log(`Pusher active`)
    } catch (error) {
      console.warn(`Pusher failed to start`)
      console.warn(error.message)
    }
  }

  async emit(channel: string, event: string, data: any = {}): Promise<void> {
    if (this.client) {
      await this.client.trigger(channel, event, data)
    }
  }

  async authorizeChannel(
    socketId: string,
    channel: string,
    data?: PresenceDataOptions,
  ): Promise<AuthorizeChannelResponse> {
    if (this.client) {
      return this.client.authorizeChannel(socketId, channel, data)
    }
  }
}
