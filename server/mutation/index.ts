import { GraphQLObjectType } from "graphql";
import { register, login } from "./userMutations";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register,
    login
  }
});

export default mutation;
