import { Trpc } from '@/core/trpc/server'
import { z } from 'zod'

export const AnnouncementRouter = Trpc.createRouter({
  findMany: Trpc.procedure
    .input(
      z.object({
        where: z
          .object({
            organizationId: z.string().optional(),
          })
          .optional(),
        orderBy: z
          .object({
            dateCreated: z.enum(['asc', 'desc']).optional(),
          })
          .optional(),
        take: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.database.announcement.findMany({
        where: input.where,
        orderBy: input.orderBy,
        take: input.take,
      })
    }),
})
