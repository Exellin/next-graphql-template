import 'dotenv/config';
import mercurius from 'mercurius';
import Fastify from 'fastify';
import cookie from 'fastify-cookie';
import mercuriusAuth from 'mercurius-auth';
import AltairFastify from 'altair-fastify-plugin';
import fastifyCors from 'fastify-cors';

import { verify } from 'jsonwebtoken';
import User from './models/User';
import Context from './Context';
import dbSetup from './db/db-setup';
import mutation from './mutation';
import query from './query';
import schema from './schema';
import { createAccessToken, createRefreshToken, setContextPayload } from './auth';

const main = async () => {
  dbSetup();

  const resolvers = {
    Mutation: {
      ...mutation,
    },
    Query: {
      ...query,
    },
  };

  const app = Fastify();

  await app.register(mercurius, {
    schema,
    resolvers,
  });

  app.register(cookie);

  app.register(AltairFastify, {
    path: '/playground',
  });

  app.register(fastifyCors, {
    origin: (_origin, cb) => {
      if (process.env.NODE_ENV === 'development') {
        cb(null, true);
        return;
      }

      throw new Error('Not allowed');
    },
  });

  app.register(mercuriusAuth, {
    async applyPolicy(_authDirectiveAST, _parent, _args, context: Context) {
      if (!context.payload?.userId) {
        throw new Error('Not Authenticated');
      }
      return true;
    },
    authDirective: 'auth',
  });

  app.graphql.addHook('preExecution', setContextPayload);

  app.post('/refresh_token', {}, async (request, reply) => {
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

    reply.setCookie('jid', createRefreshToken(user), { httpOnly: true });
    reply.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const port = process.env.PORT || 4000;
  // eslint-disable-next-line no-console
  app.listen(port, '0.0.0.0', () => console.log(`server started on http://localhost:${port}/playground`));
};

main();
