import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { verify } from 'jsonwebtoken';

import { createAccessToken } from '../auth';
import User from '../models/User';

const refreshTokenRoute = (fastify: FastifyInstance, _options: FastifyServerOptions, done: () => void) => {
  fastify.post('/refresh_token', {}, async (request, reply) => {
    const token = request.cookies.jid;

    if (!token) {
      reply.send({ ok: false, accessToken: '' });
    }

    let payload: any;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch {
      reply.send({ ok: false, accessToken: '' });
    }

    const user = await User.query().findById(payload.userId);

    if (!user) {
      reply.send({ ok: false, accessToken: '' });
    }

    if (user.refreshTokenVersion !== payload.tokenVersion) {
      reply.send({ ok: false, accessToken: '' });
    }

    reply.send({ ok: true, accessToken: createAccessToken(user) });
  });

  done();
};

export default refreshTokenRoute;
