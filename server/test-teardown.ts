import knex from './db/knex';

module.exports = async () => {
  await knex('user').del();
  knex.destroy();
};
