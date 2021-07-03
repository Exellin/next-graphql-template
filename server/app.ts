import 'dotenv/config';
import mercurius from 'mercurius';
import Fastify, { FastifyServerOptions } from 'fastify';
import cookie from 'fastify-cookie';
import mercuriusAuth from 'mercurius-auth';
import AltairFastify from 'altair-fastify-plugin';
import fastifyCors from 'fastify-cors';

import Context from './Context';
import mutation from './mutation';
import query from './query';
import schema from './schema';
import { setContextPayload } from './auth';
import refreshTokenRoute from './routes/refresh-token';

const buildFastify = async (opts: FastifyServerOptions = {}) => {
  const resolvers = {
    Mutation: {
      ...mutation,
    },
    Query: {
      ...query,
    },
  };

  const app = Fastify(opts);

  await app.register(mercurius, {
    schema,
    resolvers,
  });

  app.graphql.addHook('preExecution', setContextPayload);

  app.register(mercuriusAuth, {
    async applyPolicy(_authDirectiveAST, _parent, _args, context: Context) {
      if (!context.payload?.userId) {
        throw new Error('Not Authenticated');
      }
      return true;
    },
    authDirective: 'auth',
  });

  app.register(cookie);

  if (process.env.NODE_ENV === 'development') {
    app.register(AltairFastify, {
      path: '/playground',
    });
  }

  app.register(fastifyCors, {
    origin: (origin: string, cb) => {
      const acceptedEnvironments = ['test', 'development'];
      const acceptedDomainRegex = new RegExp(process.env.ACCEPTED_DOMAIN!);

      if (acceptedDomainRegex.test(origin) || acceptedEnvironments.includes(process.env.NODE_ENV!)) {
        cb(null, true);
        return;
      }

      throw new Error('Not allowed');
    },
    credentials: true,
  });

  app.register(refreshTokenRoute);

  return app;
};

export default buildFastify;
