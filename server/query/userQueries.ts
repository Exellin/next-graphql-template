import { QueryUserArgs } from 'generated/graphql';
import User from '../models/User';

const user = async (_: unknown, { id }: QueryUserArgs):
Promise<User | undefined> => User.query().findById(id!);

const users = async (): Promise<User[]> => User.query();

export { user, users };
