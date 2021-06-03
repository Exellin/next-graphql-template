import { sign, verify } from 'jsonwebtoken';

import Context from './Context';
import User from './models/User';

const createAccessToken = (user: User) => sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' });

const createRefreshToken = (user: User) => sign({ userId: user.id, tokenVersion: user.refreshTokenVersion }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

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

export { createAccessToken, createRefreshToken, setContextPayload };
