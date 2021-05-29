import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const userGraphqlType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

export default userGraphqlType;
