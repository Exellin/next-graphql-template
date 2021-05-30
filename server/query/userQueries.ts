import User from '../models/User';

const user = async (_source: unknown, { id }: { id?: number }): Promise<User | undefined> => await User.query().findById(id!);
const users = async (): Promise<User[]> => await User.query();

export { user, users }

