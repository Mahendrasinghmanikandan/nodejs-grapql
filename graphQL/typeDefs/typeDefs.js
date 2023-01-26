const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
  }

  type  Article {
    _id: ID
    authorName: String
    article: String
    authorId: User
  }
  

  input userInput {
    id: ID
    email: String
    password: String
  }

  input forArticle {
    _id: ID
    authorName: String
    article: String
    authorId: String
  }

  type Query {
    authUser(loginDetails: userInput): String,
    
    getAllArticle:[Article],    
    getOneArticle(id:ID):Article,
    getMyArticle(id:ID):[Article]
    
  }

  type Mutation {
    registerUser(input: userInput): User,

    makeArticle(article: forArticle): Article,
    updateArticle(id:ID,data:forArticle):String,
    deleteMyOneArticle(id:ID):String,

    deleteMyAccount(id:ID):String,
  }
`;

module.exports = typeDefs;
