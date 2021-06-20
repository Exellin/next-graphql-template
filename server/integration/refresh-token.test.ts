import { verify } from 'jsonwebtoken';
import User from '../models/User';
import knex from '../db/knex';
import dbSetup from '../db/db-setup';
import { createRefreshToken } from '../auth';
import buildFastify from '../app';

describe('POST /refresh_token', () => {
  it('responds with an empty accessToken if there is no refresh token cookie', async () => {
    const app = await buildFastify();

    const expectedResponse = { ok: false, accessToken: '' };

    const response = await app.inject({
      method: 'POST',
      url: '/refresh_token',
    });

    expect(response.json()).toStrictEqual(expectedResponse);
  });

  it('responds with an empty accessToken if the refresh token cookie is not valid', async () => {
    const app = await buildFastify();

    const expectedResponse = { ok: false, accessToken: '' };

    const response = await app.inject({
      method: 'POST',
      url: '/refresh_token',
      cookies: { jid: 'invalid refresh token' },
    });

    expect(response.json()).toStrictEqual(expectedResponse);
  });

  describe('when a valid refresh token was created for a user', () => {
    beforeAll(() => {
      dbSetup();
    });

    beforeEach(async () => {
      await knex.seed.run();
    });

    afterEach(async () => {
      await knex('user').del();
    });

    afterAll(() => {
      knex.destroy();
    });

    it('responds with an empty accessToken if that user is no longer in the database', async () => {
      const app = await buildFastify();
      const users = await User.query().limit(1);

      const user = users[0];
      const refreshToken = createRefreshToken(user);
      const expectedResponse = { ok: false, accessToken: '' };

      await User.query().deleteById(user.id);

      const response = await app.inject({
        method: 'POST',
        url: '/refresh_token',
        cookies: { jid: refreshToken },
      });

      expect(response.json()).toStrictEqual(expectedResponse);
    });

    it('responds with an empty accessToken when the token versions do not match', async () => {
      const app = await buildFastify();
      const users = await User.query().limit(1);

      const user = users[0];
      const refreshToken = createRefreshToken(user);
      const expectedResponse = { ok: false, accessToken: '' };

      await User.query().findById(user.id).patch({ refreshTokenVersion: 1 });

      const response = await app.inject({
        method: 'POST',
        url: '/refresh_token',
        cookies: { jid: refreshToken },
      });

      expect(response.json()).toStrictEqual(expectedResponse);
    });

    it('responds with a new accessToken', async () => {
      const app = await buildFastify();
      const users = await User.query().limit(1);

      const user = users[0];
      const refreshToken = createRefreshToken(user);

      const response = await app.inject({
        method: 'POST',
        url: '/refresh_token',
        cookies: { jid: refreshToken },
      });

      expect(response.json().ok).toBe(true);
      const payload = verify(response.json().accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
      expect(payload.userId).toBe(user.id);
    });
  });
});
