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

        createMany: procedure.input($Schema.MfaConfigInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.createMany(input as any))),

        create: procedure.input($Schema.MfaConfigInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.create(input as any))),

        deleteMany: procedure.input($Schema.MfaConfigInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.deleteMany(input as any))),

        delete: procedure.input($Schema.MfaConfigInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.delete(input as any))),

        findFirst: procedure.input($Schema.MfaConfigInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).mfaConfig.findFirst(input as any))),

        findMany: procedure.input($Schema.MfaConfigInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).mfaConfig.findMany(input as any))),

        findUnique: procedure.input($Schema.MfaConfigInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).mfaConfig.findUnique(input as any))),

        updateMany: procedure.input($Schema.MfaConfigInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.updateMany(input as any))),

        update: procedure.input($Schema.MfaConfigInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mfaConfig.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.MfaConfigCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.MfaConfigCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MfaConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MfaConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MfaConfigGetPayload<T>, Context>) => Promise<Prisma.MfaConfigGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.MfaConfigDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.MfaConfigDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MfaConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MfaConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MfaConfigGetPayload<T>, Context>) => Promise<Prisma.MfaConfigGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.MfaConfigFindFirstArgs, TData = Prisma.MfaConfigGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MfaConfigFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MfaConfigGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MfaConfigFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MfaConfigFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MfaConfigGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MfaConfigGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.MfaConfigFindManyArgs, TData = Array<Prisma.MfaConfigGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.MfaConfigFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.MfaConfigGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MfaConfigFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MfaConfigFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.MfaConfigGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.MfaConfigGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.MfaConfigFindUniqueArgs, TData = Prisma.MfaConfigGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MfaConfigFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MfaConfigGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MfaConfigFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MfaConfigFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MfaConfigGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MfaConfigGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.MfaConfigUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.MfaConfigUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MfaConfigUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MfaConfigGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MfaConfigGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MfaConfigUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MfaConfigUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MfaConfigGetPayload<T>, Context>) => Promise<Prisma.MfaConfigGetPayload<T>>
            };

    };
}
