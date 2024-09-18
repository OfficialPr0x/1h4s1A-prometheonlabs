import { Trpc } from '@/core/trpc/server'
import { z } from 'zod'
import { SocketService } from '../libraries/socket/socket.service'

/**
 * @provider SocketRouter
 * @description A socket router to emit event.
 * @function {({ channel: string, event: string, message: string }) => Promise<{ success: boolean }>} emit - Emit an event to a channel with a message.
 * @usage `const { mutateAsync: emit } = Api.socket.emit.useMutation(); emit({ channel, event, message });`
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc'
 */
export const SocketRouter = Trpc.createRouter({
  emit: Trpc.procedurePublic
    .input(
      z.object({
        channel: z.string(),
        event: z.string(),
        data: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const { channel, event, data } = input

      try {
        await SocketService.emit(channel, event, data)

        return { success: true }
      } catch (error) {
        console.error(error)
        return { success: false }
      }
    }),
})
