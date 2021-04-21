const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    info: String!
    urls: [URL]!
  }

  type Mutation {
    shortenURL(url: String!): String!
  }

  type URL {
    id: ID!
    originalUrl: String!
    shortUrl: String!
  }
`;

module.exports = typeDefs;
