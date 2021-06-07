import { Provider } from 'urql';
import type { ComponentType } from 'react';

import '../styles/globals.css';
import { client, ssrCache } from '../urqlClient';

const App = ({ Component, pageProps }: { Component: ComponentType, pageProps: any }) => {
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
