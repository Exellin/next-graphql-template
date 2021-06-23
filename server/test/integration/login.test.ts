import faker from 'faker';
import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { FastifyInstance } from 'fastify';
import { Response } from 'light-my-request';

import knex from '../../db/knex';
import buildFastify from '../../app';
import dbSetup from '../../db/db-setup';
import User from '../../models/User';
import { MutationLoginArgs } from '../../generated/graphql';

describe('login mutation', () => {
  let user: User;
  let app: FastifyInstance;
  let response: Response;
  let variables: MutationLoginArgs;
  const password: string = 'password';

  beforeAll(() => {
    dbSetup();
  });

  afterAll(() => {
    knex.destroy();
  });

  beforeEach(async () => {
    app = await buildFastify();

    user = await User.query().insertAndFetch({
      firstName: 'test',
      lastName: 'test',
      email: faker.internet.email(),
      password: await hash(password, 12),
    });

    variables = {
      input: {
        email: user.email,
        password,
      },
    };
  });

  const query = `#graphql
    mutation login($input: LoginInput!){
      login(input: $input){
        accessToken
      }
    }
  `;

  const callLogin = async () => app.inject({
    method: 'POST',
    url: '/graphql',
    headers: { 'Content-Type': 'application/json' },
    payload: {
      query,
      variables,
    },
  });

  const invalidCredentialsResponse = {
    data: { login: null },
    errors: [
      {
        message: 'invalid credentials',
      },
    ],
  };

  it("responds with invalid credentials when given an email that doesn't exist in the database", async () => {
    variables.input.email = 'emaildoesnotexist@example.com';

    response = await callLogin();

    expect(response.json()).toMatchObject(invalidCredentialsResponse);
  });

  it('responds with invalid credentials when given a valid email and invalid password', async () => {
    variables.input.password = 'invalid password';

    response = await callLogin();

    expect(response.json()).toMatchObject(invalidCredentialsResponse);
  });

  describe('when given a valid email and password for a user', () => {
    beforeEach(async () => {
      response = await callLogin();
    });

    it('responds with an access token', async () => {
      const payload = verify(response.json().data.login.accessToken, process.env.ACCESS_TOKEN_SECRET!) as any;
      expect(payload.userId).toBe(user.id);
    });

    it('sets a HttpOnly cookie with a refresh token, path, and expiry on the response', async () => {
      const setCookieValue = response?.headers['set-cookie'] as string;
      const [cookieKeyValue, path, expiry, httpOnly] = setCookieValue.split('; ');
      const [, refreshToken] = cookieKeyValue.split('=');

      expect(path).toBe('Path=/refresh_token');
      expect(expiry).toContain('Expires=');
      expect(httpOnly).toBe('HttpOnly');

      const payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
      expect(payload.userId).toBe(user.id);
    });
  });
});
