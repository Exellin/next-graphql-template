import {
  FC, ReactChild, createContext, useState, useCallback,
  useEffect, useContext, SetStateAction, Dispatch,
} from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

type ContextValue = { token: string, setToken: Dispatch<SetStateAction<string>> };

const MAX_TIMEOUT = 2147483647; // 2^31  - 1, larger and setTimeout fires immediately
const TokenContext = createContext<ContextValue | undefined>(undefined);

interface Props {
  children: ReactChild | ReactChild[]
}

const TokenProvider: FC<Props> = ({ children }: Props) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshToken = useCallback(() => {
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
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const value = {
    token, setToken,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

const useToken = () => {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }

  return context;
};

export { TokenProvider, useToken };
