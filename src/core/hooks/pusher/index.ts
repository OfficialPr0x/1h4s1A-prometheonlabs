import { Configuration } from '@/core/configuration'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'

/**
 * @provider PusherClient
 * @description A client to listen to events using Pusher and manage presence
 * @function
 * @usage `const { pusherClient, connectedUserIds } = usePusherClient();
 * if (pusherClient) {
 *  const channel = pusherClient.subscribe('private-my-channel')
 *  channel.bind('my-event', () => {
 *   console.log('Implement your logic here')
 *  })
 * }
 * `
 * @import import { usePusherClient } from '@/core/hooks/pusher'
 */
export const usePusherClient = () => {
  const isProduction = Configuration.isProduction()

  const [pusherClient, setPusherClient] = useState(null)
  const [connectedUserIds, setConnectedUserIds] = useState([])

  const { user } = useUserContext()

  const { data, isError } = Api.configuration.getPublic.useQuery()

  useEffect(() => {
    if (data && !isError) {
      const pusherKey = data['PUBLIC_PUSHER_KEY']
      const pusherCluster = data['PUBLIC_PUSHER_CLUSTER']

      if (!pusherKey || !pusherCluster) {
        console.error(
          'Set PUBLIC_PUSHER_KEY and PUBLIC_PUSHER_CLUSTER in your .env to activate',
        )
        return
      }

      if (!isProduction) {
        Pusher.logToConsole = true
      }

      const pusher = new Pusher(pusherKey, {
        cluster: pusherCluster,
        authEndpoint: '/api/pusher',
      })

      setPusherClient(pusher)

      if (user) {
        const channelPresence = pusher.subscribe('presence-channel')

        channelPresence.bind('pusher:subscription_succeeded', members => {
          const userIds = Object.keys(members.members)
          setConnectedUserIds(userIds)
        })

        channelPresence.bind('pusher:member_added', member => {
          setConnectedUserIds(prev => [...prev, member.id])
        })

        channelPresence.bind('pusher:member_removed', member => {
          setConnectedUserIds(prev => prev.filter(id => id !== member.id))
        })
      }

      return () => {
        pusher.unsubscribe('presence-channel')
      }
    }
  }, [data, isError, user])

  return { pusherClient, connectedUserIds }
}
