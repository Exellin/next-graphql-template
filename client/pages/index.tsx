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
`;

const Index = () => {
  const [result] = useQuery({
    query: usersQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return 'Loading';
  if (error) return 'Error';

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Index;
