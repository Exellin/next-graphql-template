import { useQuery } from 'urql';

const usersQuery = `#graphql
  query getUsers {
    users{
      id
      firstName
      lastName
      email
      name
    }
  }
`

export default function Home() {
  const [result] = useQuery({
    query: usersQuery
  });

  const {data, loading, error} = result;

  if (loading) return 'Loading';
  if (error) return 'Error';

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
