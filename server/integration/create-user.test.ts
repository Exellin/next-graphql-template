import faker from 'faker';

import knex from '../db/knex';
import buildFastify from '../app';
import dbSetup from '../db/db-setup';
import User from '../models/User';

describe('createUser mutation', () => {
  beforeAll(() => {
    dbSetup();
  });

  afterAll(async () => {
    knex.destroy();
  });

  const query = `#graphql
    mutation createUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const userProperties = {
    email: faker.internet.email(),
    firstName: 'test',
    lastName: 'test',
  };

  const variables = {
    input: {
      ...userProperties,
      password: 'password',
    },
  };

  it('creates a user in the database and responds with the created user properties', async () => {
    const app = await buildFastify();

    const expectedResponse = {
      data: {
        createUser: {
          ...userProperties,
        },
      },
    };

    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'Content-Type': 'application/json' },
      payload: {
        query,
        variables,
      },
    });

    expect(response.json()).toMatchObject(expectedResponse);

    const user = await User.query().findById(response.json().data.createUser.id);

    expect(user).toMatchObject(userProperties);
  });
});
