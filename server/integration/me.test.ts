import buildFastify from '../app';

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
      payload: JSON.stringify({ query }),
    });

    expect(response.json()).toStrictEqual(expectedMe);
  });
});
