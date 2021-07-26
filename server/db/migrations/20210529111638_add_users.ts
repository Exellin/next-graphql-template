import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('email').unique();
    table.string('password');
    table.integer('refreshTokenVersion').defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user');
}
