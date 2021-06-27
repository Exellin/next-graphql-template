import {
  ComponentType, FC, useEffect, useState,
} from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import Header from '../components/Header';
import TokenContext from '../TokenContext';
import UrqlProvider from '../components/UrqlProvider';
import { darkTheme } from '../stitches.config';

interface Props {
  Component: ComponentType, pageProps: any
}

const MAX_TIMEOUT = 2147483647; // 2^31  - 1, larger and setTimeout fires immediately

const App: FC<Props> = ({ Component, pageProps }: Props) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshToken = () => {
    const scheduleNextRefresh = (accessToken: string) => {
      try {
        const { exp } = jwtDecode<JwtPayload>(accessToken);

        if (exp) {
          const expiresIn = exp * 1000 - Date.now();
          if (expiresIn > MAX_TIMEOUT) {
            setTimeout(refreshToken, MAX_TIMEOUT);
          } else {
            setTimeout(refreshToken, expiresIn - 500);
          }
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

  const currentTheme = localStorage.getItem('theme') || 'system';

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: 'light-theme', dark: darkTheme }}
      defaultTheme={currentTheme}
    >
      <TokenContext.Provider value={state}>
        <UrqlProvider>
          <Header />
          <Component {...pageProps} />
        </UrqlProvider>
      </TokenContext.Provider>
    </ThemeProvider>
  );
};

export default App;
