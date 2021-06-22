import faker from 'faker';

import buildFastify from '../../app';
import User from '../../models/User';
import { createAccessToken } from '../../auth';
import knex from '../../db/knex';
import dbSetup from '../../db/db-setup';

describe('me query', () => {
  const query = `#graphql
    query {
      me {
        id
      }
    }`;

  test('without an authorization header returns null', async () => {
    const expectedMe = {
      data: {
        me: null,
      },
    };

    const app = await buildFastify();

    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'Content-Type': 'application/json' },
      payload: {
        query,
      },
    });

    expect(response.json()).toStrictEqual(expectedMe);
  });

  test('with an invalid authorization header returns null', async () => {
    const expectedMe = {
      data: {
        me: null,
      },
    };

    const app = await buildFastify();

    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'Content-Type': 'application/json', authorization: 'bearer invalid-token' },
      payload: {
        query,
      },
    });

    expect(response.json()).toStrictEqual(expectedMe);
  });

  describe('with a valid accessToken for a user in the authorization header', () => {
    let user: User;

    beforeAll(() => {
      dbSetup();
    });

    beforeEach(async () => {
      user = await User.query().insertAndFetch({
        firstName: 'test',
        lastName: 'test',
        email: faker.internet.email(),
        password: 'password',
      });
    });

    afterAll(() => {
      knex.destroy();
    });

    it('returns the user with the userId in the accessToken payload', async () => {
      const accessToken = createAccessToken(user);

      const app = await buildFastify();

      const response = await app.inject({
        method: 'POST',
        url: '/graphql',
        headers: { 'Content-Type': 'application/json', authorization: `bearer ${accessToken}` },
        payload: {
          query,
        },
      });

      expect(response.json().data.me.id).toBe(user.id.toString());
    });
  });
});
