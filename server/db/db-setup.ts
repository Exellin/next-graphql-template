import { Model } from 'objection';
import knex from './knex';

const dbSetup = () => {
  Model.knex(knex);
};

export default dbSetup;
