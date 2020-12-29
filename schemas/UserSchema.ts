import { gql } from "apollo-server";

/**
 * @description holds user schema
 */

export const UserSchema = gql`
  
  type User {
    _id: ID!,
    name: String!,
    password: String!,
    email: String!
  }

  type AuthPayload {
    token: String,
    user: User!,
    _id: ID!,
    name: String!,
    password: String!,
    email: String!
  }

  input CreateUserInput {
    name: String!,
    password: String!,
    email: String!
  }

  input UpdateUserInput {
    id: String!,
    name: String!,
    email: String!
  }
  
  extend type Query {
    users: [User]
    user(id: String!): User
    me: User
  }
  
  input SignInUser {
    email: String!,
    password: String!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): AuthPayload
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: String!): User
    signInUser(input: SignInUser!): AuthPayload
  }
`