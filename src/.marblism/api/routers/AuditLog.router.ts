/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.AuditLogInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.createMany(input as any))),

        create: procedure.input($Schema.AuditLogInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.create(input as any))),

        deleteMany: procedure.input($Schema.AuditLogInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.deleteMany(input as any))),

        delete: procedure.input($Schema.AuditLogInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.delete(input as any))),

        findFirst: procedure.input($Schema.AuditLogInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).auditLog.findFirst(input as any))),

        findMany: procedure.input($Schema.AuditLogInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).auditLog.findMany(input as any))),

        findUnique: procedure.input($Schema.AuditLogInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).auditLog.findUnique(input as any))),

        updateMany: procedure.input($Schema.AuditLogInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.updateMany(input as any))),

        update: procedure.input($Schema.AuditLogInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).auditLog.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AuditLogCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AuditLogCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AuditLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AuditLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AuditLogGetPayload<T>, Context>) => Promise<Prisma.AuditLogGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AuditLogDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AuditLogDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AuditLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AuditLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AuditLogGetPayload<T>, Context>) => Promise<Prisma.AuditLogGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AuditLogFindFirstArgs, TData = Prisma.AuditLogGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AuditLogFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AuditLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AuditLogFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AuditLogFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AuditLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AuditLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AuditLogFindManyArgs, TData = Array<Prisma.AuditLogGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AuditLogFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AuditLogGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AuditLogFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AuditLogFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AuditLogGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AuditLogGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AuditLogFindUniqueArgs, TData = Prisma.AuditLogGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AuditLogFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AuditLogGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AuditLogFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AuditLogFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AuditLogGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AuditLogGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AuditLogUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AuditLogUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AuditLogUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AuditLogGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AuditLogGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AuditLogUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AuditLogUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AuditLogGetPayload<T>, Context>) => Promise<Prisma.AuditLogGetPayload<T>>
            };

    };
}
