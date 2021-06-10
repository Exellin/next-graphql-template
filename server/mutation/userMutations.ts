import { hash, compare } from 'bcryptjs';
import Context from 'Context';

import { LoginResponse, MutationLoginArgs, MutationCreateUserArgs } from 'generated/graphql';
import User from '../models/User';
import { createAccessToken, createRefreshToken } from '../auth';

const createUser = async (_: unknown, { input }: MutationCreateUserArgs): Promise<User> => {
  const {
    firstName, lastName, email, password,
  } = input;
  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 12);
  }

  const user = await User.query().insert({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

const login = async (_: unknown, { input }: MutationLoginArgs, ctx: Context): Promise<LoginResponse> => {
  const { email, password } = input;
  const user = await User.query().findOne({ email });

  if (!user || !password) {
    throw new Error('invalid credentials');
  }

  const valid = await compare(password, user.password);

  if (!valid) {
    throw new Error('invalid credentials');
  }

  ctx.reply.setCookie('jid', createRefreshToken(user), { httpOnly: true });

  return {
    accessToken: createAccessToken(user),
  };
};

export { createUser, login };
