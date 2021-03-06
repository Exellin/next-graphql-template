import { hash, compare } from 'bcryptjs';
import Context from 'Context';

import { LoginResponse, MutationLoginArgs, MutationCreateUserArgs } from 'generated/graphql';
import User from '../models/User';
import { createAccessToken, createRefreshToken, refreshTokenExpiresInDays } from '../auth';

const REFRESH_TOKEN_PATH = '/refresh_token';

const createUser = async (_: unknown, { input }: MutationCreateUserArgs): Promise<User> => {
  const {
    email, password,
  } = input;
  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 12);
  }

  const user = await User.query().insertAndFetch({
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

  ctx.reply.setCookie('jid', createRefreshToken(user),
    {
      httpOnly: true,
      path: REFRESH_TOKEN_PATH,
      expires: new Date(new Date().setDate(new Date().getDate() + refreshTokenExpiresInDays)),
    });

  return {
    accessToken: createAccessToken(user),
  };
};

const logout = (_: unknown, _args: any, ctx: Context): boolean => {
  ctx.reply.clearCookie('jid', { path: REFRESH_TOKEN_PATH });

  return true;
};

export { createUser, login, logout };
