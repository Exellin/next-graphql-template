import knex from 'knex';
import { Model } from 'objection';

import knexfile from '../knexfile';

const dbSetup = () => {
  const db = knex(knexfile.development);
  Model.knex(db);
};

export default dbSetup;
