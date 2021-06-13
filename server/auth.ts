import { sign, verify } from 'jsonwebtoken';

import Context from './Context';
import User from './models/User';

const DEFAULT_ACCESS_TOKEN_EXPIRY = '15m';
const DEFAULT_REFRESH_TOKEN_EXPIRY_DAYS = 7;

const accessTokenExpiresIn = process.env.ACCESS_TOKEN_EXPIRY || DEFAULT_ACCESS_TOKEN_EXPIRY;
const createAccessToken = (user: User) => sign(
  { userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: accessTokenExpiresIn },
);

const refreshTokenExpiresInDays = Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS || DEFAULT_REFRESH_TOKEN_EXPIRY_DAYS);
const createRefreshToken = (user: User) => sign(
  { userId: user.id, tokenVersion: user.refreshTokenVersion },
  process.env.REFRESH_TOKEN_SECRET!, { expiresIn: `${refreshTokenExpiresInDays}d` },
);

const setContextPayload = async (_schema: unknown, _document: unknown, context: Context) => {
  const authHeader = context.reply.request.headers.authorization;
  let payload;

  if (authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch {}
  }

  context.payload = payload as any;
};

export {
  createAccessToken, createRefreshToken, setContextPayload, refreshTokenExpiresInDays,
};
