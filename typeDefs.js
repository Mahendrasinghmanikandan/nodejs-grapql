const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
  }

  input userInput {
    id: ID
    email: String
    password: String
  }
  type Query {
    authUser(loginDetails: userInput): String,
    dashboard(token:String):String
  }

  type Mutation{
        registerUser(input:userInput):User
  }
`;

module.exports = typeDefs;
