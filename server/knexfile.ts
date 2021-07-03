import { knexSnakeCaseMappers } from 'objection';

interface KnexEnvironments {
  development: object,
  test: object,
  production: object,
}

const localConnection = {
  host: 'localhost',
  port: 3306,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

const connection = process.env.DATABASE_URL || localConnection;

const knexConfig: KnexEnvironments = {
  development: {
    client: 'mysql2',
    connection,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations',
    },
    debug: true,
    seeds: {
      directory: 'db/seeds',
    },
    ...knexSnakeCaseMappers,
  },
  test: {
    client: 'mysql2',
    connection,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
    ...knexSnakeCaseMappers,
  },
  production: {
    client: 'mysql2',
    connection,
    debug: false,
    ...knexSnakeCaseMappers,
  },
};

export default knexConfig;

export { KnexEnvironments };
