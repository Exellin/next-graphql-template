import User from '../models/User';

const user = async (_source: unknown, { id }: { id?: number }):
Promise<User | undefined> => User.query().findById(id!);

const users = async (): Promise<User[]> => User.query();

export { user, users };
