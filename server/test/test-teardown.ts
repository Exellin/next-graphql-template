import type { Config } from '@jest/types';

import knex from '../db/knex';

module.exports = async (opts: Config.InitialOptions) => {
  if (!opts.watchAll) {
    knex.destroy();
  }
};
