import { hash } from 'bcryptjs';
import * as Knex from 'knex';

const seed = async (knex: Knex): Promise<void> => {
  await knex('user').del();

  await knex('user').insert([
    {
      email: 'test@example.com',
      password: await hash('password', 12),
    },
  ]);
};

exports.seed = seed;
