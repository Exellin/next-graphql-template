export default `#graphql
  directive @auth on OBJECT | FIELD_DEFINITION

  type Query {
    user(id: Int!): User @auth
    users: [User!]! @auth
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    name: String!
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): LoginResponse
  }

  type LoginResponse {
    accessToken: String!
  }
`;
