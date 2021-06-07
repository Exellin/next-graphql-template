import { useGetUsersQuery } from '../generated/graphql';

const Index = () => {
  const [result] = useGetUsersQuery();

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
