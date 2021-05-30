import "dotenv/config";
import mercurius from 'mercurius';
import Fastify from "fastify";
import { GraphQLSchema } from "graphql";
import cookie from 'fastify-cookie'

import query from './query';
import mutation from './mutation';
import dbSetup from './db/db-setup';

const main = async () => {
  dbSetup();

  const schema: GraphQLSchema = new GraphQLSchema({
    query,
    mutation
  });

  const app = Fastify()

  app.register(mercurius, {
    schema,
    graphiql: 'playground'
  })

  app.register(cookie)

  const port = process.env.PORT || 4000;
  app.listen(port, '0.0.0.0', () => console.log(`server started on http://localhost:${port}/playground`));
}

main();
