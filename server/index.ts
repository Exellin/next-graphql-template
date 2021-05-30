import "dotenv/config";
import mercurius from 'mercurius';
import Fastify from "fastify";
import cookie from 'fastify-cookie'
import mercuriusAuth from 'mercurius-auth';
import AltairFastify from 'altair-fastify-plugin';

import dbSetup from './db/db-setup';
import mutation from "./mutation"
import query from "./query";
import schema from './schema';
import { setContextPayload } from "./auth";
import Context from "Context";

const main = async () => {
  dbSetup();

  const resolvers = {
    Mutation: {
      ...mutation
    },
    Query: {
      ...query
    }
  }

  const app = Fastify()

  await app.register(mercurius, {
    schema,
    resolvers
  })

  app.register(cookie)
  app.register(AltairFastify, {
    path: '/playground'
  })

  app.register(mercuriusAuth, {
    async applyPolicy (_authDirectiveAST, _parent, _args, context: Context, _info) {
      if (!context.payload?.userId) {
        throw new Error('Not Authenticated')
      }
      return true
    },
    authDirective: 'auth'
  })

  app.graphql.addHook('preExecution', setContextPayload)

  const port = process.env.PORT || 4000;
  app.listen(port, '0.0.0.0', () => console.log(`server started on http://localhost:${port}/playground`));
}

main();
