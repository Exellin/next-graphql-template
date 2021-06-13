import Context from 'Context';
import { QueryUserArgs } from 'generated/graphql';
import User from '../models/User';

const user = async (_: unknown, { id }: QueryUserArgs):
Promise<User | undefined> => User.query().findById(id!);

const users = async (): Promise<User[]> => User.query();

const me = async (_: unknown, _args: any, { payload }: Context):
Promise<User | undefined> => (payload?.userId ? User.query().findById(payload.userId) : undefined);

export { user, users, me };
