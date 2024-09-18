/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createAccountRouter from "./Account.router";
import createUserRouter from "./User.router";
import createSessionRouter from "./Session.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createOrganizationRouter from "./Organization.router";
import createPaymentRouter from "./Payment.router";
import createFileRouter from "./File.router";
import createMfaConfigRouter from "./MfaConfig.router";
import createAiResponseRouter from "./AiResponse.router";
import createSubscriptionRouter from "./Subscription.router";
import createAuditLogRouter from "./AuditLog.router";
import createRagVectorRouter from "./RagVector.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as SessionClientType } from "./Session.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as PaymentClientType } from "./Payment.router";
import { ClientType as FileClientType } from "./File.router";
import { ClientType as MfaConfigClientType } from "./MfaConfig.router";
import { ClientType as AiResponseClientType } from "./AiResponse.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as AuditLogClientType } from "./AuditLog.router";
import { ClientType as RagVectorClientType } from "./RagVector.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        account: createAccountRouter(router, procedure),
        user: createUserRouter(router, procedure),
        session: createSessionRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        payment: createPaymentRouter(router, procedure),
        file: createFileRouter(router, procedure),
        mfaConfig: createMfaConfigRouter(router, procedure),
        aiResponse: createAiResponseRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        auditLog: createAuditLogRouter(router, procedure),
        ragVector: createRagVectorRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    account: AccountClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    payment: PaymentClientType<AppRouter>;
    file: FileClientType<AppRouter>;
    mfaConfig: MfaConfigClientType<AppRouter>;
    aiResponse: AiResponseClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    auditLog: AuditLogClientType<AppRouter>;
    ragVector: RagVectorClientType<AppRouter>;
}
