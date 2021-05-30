import { knexSnakeCaseMappers } from 'objection';

export default {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations',
    },
    debug: true,
    ...knexSnakeCaseMappers,
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    debug: false,
    ...knexSnakeCaseMappers,
  },
};
