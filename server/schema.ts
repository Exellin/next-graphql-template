export default `#graphql
  directive @auth on OBJECT | FIELD_DEFINITION

  type Query {
    user(id: Int!): User @auth
    users: [User!]! @auth
    me: User
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    name: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    login(input: LoginInput!): LoginResponse
    logout: Boolean!
  }

  type LoginResponse {
    accessToken: String!
  }
`;
