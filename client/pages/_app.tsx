import {
  ComponentType, FC, useEffect, useState,
} from 'react';

import '../styles/globals.css';
import Header from '../components/Header';
import TokenContext from '../TokenContext';
import UrqlProvider from '../components/UrqlProvider';

interface Props {
  Component: ComponentType, pageProps: any
}

const App: FC<Props> = ({ Component, pageProps }: Props) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const { accessToken } = await response.json();
      setToken(accessToken);
      setLoading(false);
    });
  }, []);

  const state = {
    token, setToken,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TokenContext.Provider value={state}>
      <Header />
      <UrqlProvider>
        <Component {...pageProps} />
      </UrqlProvider>
    </TokenContext.Provider>
  );
};

export default App;
