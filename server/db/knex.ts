import knex from 'knex';

import knexfile, { KnexEnvironments } from '../knexfile';

export default knex(knexfile[process.env.NODE_ENV as keyof KnexEnvironments]);
