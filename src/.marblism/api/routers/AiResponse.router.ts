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

        createMany: procedure.input($Schema.AiResponseInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.createMany(input as any))),

        create: procedure.input($Schema.AiResponseInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.create(input as any))),

        deleteMany: procedure.input($Schema.AiResponseInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.deleteMany(input as any))),

        delete: procedure.input($Schema.AiResponseInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.delete(input as any))),

        findFirst: procedure.input($Schema.AiResponseInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).aiResponse.findFirst(input as any))),

        findMany: procedure.input($Schema.AiResponseInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).aiResponse.findMany(input as any))),

        findUnique: procedure.input($Schema.AiResponseInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).aiResponse.findUnique(input as any))),

        updateMany: procedure.input($Schema.AiResponseInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.updateMany(input as any))),

        update: procedure.input($Schema.AiResponseInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).aiResponse.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.AiResponseCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.AiResponseCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AiResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AiResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AiResponseGetPayload<T>, Context>) => Promise<Prisma.AiResponseGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.AiResponseDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.AiResponseDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AiResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AiResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AiResponseGetPayload<T>, Context>) => Promise<Prisma.AiResponseGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.AiResponseFindFirstArgs, TData = Prisma.AiResponseGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AiResponseFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AiResponseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AiResponseFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AiResponseFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AiResponseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AiResponseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.AiResponseFindManyArgs, TData = Array<Prisma.AiResponseGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.AiResponseFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.AiResponseGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AiResponseFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AiResponseFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.AiResponseGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.AiResponseGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.AiResponseFindUniqueArgs, TData = Prisma.AiResponseGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.AiResponseFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.AiResponseGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.AiResponseFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.AiResponseFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.AiResponseGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.AiResponseGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.AiResponseUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.AiResponseUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.AiResponseUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.AiResponseGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.AiResponseGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.AiResponseUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.AiResponseUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.AiResponseGetPayload<T>, Context>) => Promise<Prisma.AiResponseGetPayload<T>>
            };

    };
}
