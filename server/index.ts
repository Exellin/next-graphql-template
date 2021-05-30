import "dotenv/config";
import mercurius from 'mercurius';
import Fastify from "fastify";
import cookie from 'fastify-cookie'
import mercuriusAuth from 'mercurius-auth';

import dbSetup from './db/db-setup';
import mutation from "./mutation"
import query from "./query";
import schema from './schema';
import { getTokenPayload } from "./auth";

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
    resolvers,
    graphiql: 'playground'
  })

  app.register(cookie)

  app.register(mercuriusAuth, {
    async applyPolicy (_authDirectiveAST, _parent, _args, context, _info) {
      getTokenPayload(context)
      return true
    },
    authDirective: 'auth'
  })

  const port = process.env.PORT || 4000;
  app.listen(port, '0.0.0.0', () => console.log(`server started on http://localhost:${port}/playground`));
}

main();
