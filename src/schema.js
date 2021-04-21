const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    info: String!
    urls: [URL]!
  }

  type Mutation {
    shortenUrl(url: String!): String!
  }

  type URL {
    id: ID!
    originalUrl: String!
    shortUrl: String!
  }
`;

module.exports = typeDefs;
