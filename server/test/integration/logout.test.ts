import { FastifyInstance } from 'fastify';
import { Response } from 'light-my-request';

import buildFastify from '../../app';

describe('logout mutation', () => {
  const query = `#graphql
    mutation logout {
      logout
    }
  `;

  it('sets the /refresh_token cookie from successfully logging in to an empty string with no expiry', async () => {
    const app: FastifyInstance = await buildFastify();

    const response: Response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'Content-Type': 'application/json' },
      payload: {
        query,
      },
      cookies: { jid: 'test' },
    });

    expect(response.cookies).toEqual([
      {
        name: 'jid',
        value: '',
        path: '/refresh_token',
        expires: new Date('1970-01-01T00:00:00.000Z'),
      },
    ]);
  });
});
