import { Provider } from 'urql';
import type { ComponentType, FC } from 'react';

import '../styles/globals.css';
import { client, ssrCache } from '../urqlClient';
import Header from '../components/Header';

interface Props {
  Component: ComponentType, pageProps: any
}

const App: FC<Props> = ({ Component, pageProps }: Props) => {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
