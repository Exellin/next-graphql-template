import 'dotenv/config';

import dbSetup from './db/db-setup';
import buildFastify from './app';

const main = async () => {
  dbSetup();

  const app = await buildFastify();

  const port = process.env.PORT || 4000;
  // eslint-disable-next-line no-console
  app.listen(port, '0.0.0.0', () => console.log(`server started on http://localhost:${port}/playground`));
};

main();
