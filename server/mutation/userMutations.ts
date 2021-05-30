import { hash, compare } from 'bcryptjs';

import User from '../models/User';
import { createAccessToken, createRefreshToken } from '../auth';
import Context from 'Context';

interface LoginResponse {
  accessToken: string
}

const register = async (_source: unknown, args: {firstName?: string, lastName?: string, email?: string, password?: string }): Promise<User> => {
  const { firstName, lastName, email, password } = args;
  let hashedPassword;

  if (password) {
    hashedPassword = await hash(password, 12);
  }

  const user = await User.query().insert({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  return user;
};

const login = async (_source: unknown, { email, password }: {email: string, password: string}, ctx: Context): Promise<LoginResponse> => {
  const user = await User.query().findOne({ email });

  if (!user || !password) {
    throw new Error ('invalid credentials')
  }

  const valid = await compare(password, user.password)

  if (!valid) {
    throw new Error ('invalid credentials')
  }

  ctx.reply.setCookie('jid', createRefreshToken(user), { httpOnly: true })

  return {
    accessToken: createAccessToken(user)
  }
};

export { register, login }
