import {
  ComponentType, FC, useEffect, useState,
} from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

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

  const refreshToken = () => {
    const scheduleNextRefresh = (accessToken: string) => {
      try {
        const { exp } = jwtDecode<JwtPayload>(accessToken);

        if (exp) {
          const expiresIn = exp * 1000 - Date.now();
          setTimeout(refreshToken, expiresIn - 500);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const { accessToken } = await response.json();

      if (accessToken) {
        setToken(accessToken);
        scheduleNextRefresh(accessToken);
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    refreshToken();
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
