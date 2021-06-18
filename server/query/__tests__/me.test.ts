require('isomorphic-fetch');

describe('me query', () => {
  const query = `#graphql
    query {
      me {
        id
      }
    }`;

  test('without an authorization header returns null', () => {
    const expectedMe = {
      data: {
        me: null,
      },
    };

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((res) => expect(res).toStrictEqual(expectedMe));
  });
});
