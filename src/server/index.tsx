import { createRouter } from '@/.marblism/api/routers'
import { Trpc } from '@/core/trpc/server'
import { AiRouter } from './routers/ai.router'
import { AuthenticationRouter } from './routers/authentication.router'
import { ConfigurationRouter } from './routers/configuration.router'
import { EmailRouter } from './routers/email.router'
import { EmailTemplateRouter } from './routers/emailTemplate.router'
import { UploadRouter } from './routers/upload.router'
import { BillingRouter } from './routers/billing.router'
import { RagRouter } from './routers/rag.router'
import { SocketRouter } from './routers/socket.router'
import { NangoRouter } from './routers/nango.router'
import { AnnouncementRouter } from './routers/announcement.router'
import { NotificationRouter } from './routers/notifications.router'
import { CacheService } from '@/server/libraries/cache'

const appRouter = Trpc.mergeRouters(
  createRouter(Trpc.createRouter, Trpc.procedurePublic), // The generated tRPC router for all your models

  // the custom router, add your own routers here
  Trpc.createRouter({
    ai: AiRouter,
    authentication: AuthenticationRouter,
    billing: BillingRouter,
    configuration: ConfigurationRouter,
    email: EmailRouter,
    emailTemplate: EmailTemplateRouter,
    nango: NangoRouter,
    rag: RagRouter,
    socket: SocketRouter,
    upload: UploadRouter,
    announcement: AnnouncementRouter,
    notification: NotificationRouter,
  }),
)

export type AppRouter = typeof appRouter

export const Server = {
  appRouter,
  cache: new CacheService(),
}

// Extend PrismaClient type definition
declare module '@prisma/client' {
  interface PrismaClient {
    announcement: any
    emailTemplate: any
    notification: any
  }
}
