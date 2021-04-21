const { ApolloError } = require('apollo-server-express');
const resolvers = {
  Query: {
    info: () => 'Welcome to the backdrop coding challenge api',
    urls: async (parent, args, { dataSources }, info) => {
      try {
        const urls = await dataSources.shortenUrlAPI.allUrls();
        return urls;
      } catch (error) {
        return new ApolloError(error.message, 'QueryError');
      }
    },
  },

  Mutation: {
    shortenURL: async (parent, args, { host, dataSources }, info) => {
      try {
        const url = await dataSources.shortenUrlAPI.addUrl(args);
        return `${host}/${url}`;
      } catch (error) {
        return new ApolloError(error.message, 'QueryError');
      }
    },
  },
};

module.exports = resolvers;
