import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from "graphql";

const loginResponseGraphqlType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export default loginResponseGraphqlType;
