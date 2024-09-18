import { Trpc } from '@/core/trpc/server'
import { z } from 'zod'

export const NotificationRouter = Trpc.createRouter({
  findMany: Trpc.procedure
    .input(
      z.object({
        where: z.object({}).optional(),
        take: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.database.notification.findMany({
        where: input.where,
        take: input.take,
      })
    }),
})
