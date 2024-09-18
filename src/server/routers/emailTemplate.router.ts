import { Trpc } from '@/core/trpc/server'
import { z } from 'zod'

export const EmailTemplateRouter = Trpc.createRouter({
  findMany: Trpc.procedure
    .input(
      z.object({
        where: z
          .object({
            organizationId: z.string().optional(),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.database.emailTemplate.findMany({
        where: input.where,
      })
    }),

  create: Trpc.procedure
    .input(
      z.object({
        data: z.object({
          name: z.string(),
          subject: z.string(),
          content: z.string(),
          organizationId: z.string(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.database.emailTemplate.create({
        data: input.data,
      })
    }),

  update: Trpc.procedure
    .input(
      z.object({
        where: z.object({ id: z.string() }),
        data: z.object({
          name: z.string().optional(),
          subject: z.string().optional(),
          content: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.database.emailTemplate.update({
        where: input.where,
        data: input.data,
      })
    }),

  delete: Trpc.procedure
    .input(
      z.object({
        where: z.object({ id: z.string() }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.database.emailTemplate.delete({
        where: input.where,
      })
    }),
})
