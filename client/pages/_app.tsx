import React, {
  ComponentType, FC,
} from 'react';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import Header from '../components/Header';
import UrqlProvider from '../components/UrqlProvider';
import { darkTheme } from '../stitches.config';
import { TokenProvider } from '../components/TokenProvider';
import { CurrentUserProvider } from '../components/CurrentUserProvider';

interface Props {
  Component: ComponentType, pageProps: any
}

const App: FC<Props> = ({ Component, pageProps }: Props) => {
  let currentTheme: string = 'system';

  if (typeof window !== 'undefined') {
    currentTheme = localStorage.getItem('theme') || currentTheme;
  }

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: 'light-theme', dark: darkTheme }}
      defaultTheme={currentTheme}
    >
      <TokenProvider>
        <UrqlProvider>
          <CurrentUserProvider>
            <Header />
            <Component {...pageProps} />
          </CurrentUserProvider>
        </UrqlProvider>
      </TokenProvider>
    </ThemeProvider>
  );
};

export default App;
