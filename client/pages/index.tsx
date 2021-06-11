import { FC } from 'react';
import { useGetUsersQuery } from '../generated/graphql';

interface Props {}

const Index: FC<Props> = () => {
  const [result] = useGetUsersQuery();

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Index;
