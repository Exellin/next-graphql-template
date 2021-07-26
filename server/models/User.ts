import { Model } from 'objection';

import { User as graphqlUserType } from '../generated/graphql';

interface User extends graphqlUserType {}

class User extends Model {
  static tableName = 'user';

  password!: string;
  refreshTokenVersion!: number;
}

export default User;
