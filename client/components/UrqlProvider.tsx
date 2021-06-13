import {
  cacheExchange, createClient, dedupExchange, fetchExchange,
  Provider,
} from 'urql';
import {
  useContext, FC, ReactChild,
} from 'react';

import TokenContext from '../TokenContext';

interface Props {
  children: ReactChild | ReactChild[]
}

const UrqlProvider: FC<Props> = ({ children }: Props) => {
  const { token } = useContext(TokenContext) as any;

  const client = createClient({
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange,
      fetchExchange,
    ],
    fetchOptions: {
      credentials: 'include',
      headers: { Authorization: token ? `Bearer ${token}` : '' },
    },
  });

  return (
    <Provider value={client}>
      {children}
    </Provider>
  );
};

export default UrqlProvider;
