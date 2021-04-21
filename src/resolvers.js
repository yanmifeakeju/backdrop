const resolvers = {
  Query: {
    info: () => 'Welcome to the backdrop coding challenge api',
    urls: async (parent, args, { dataSources }, info) => {
      try {
        const urls = await dataSources.shortenUrlAPI.allUrls();
        console.log('urls');
        console.log(urls);
        return urls;
      } catch (error) {}
    },
  },

  Mutation: {
    shortenURL: async (parent, args, { host, dataSources }, info) => {
      try {
        const url = await dataSources.shortenUrlAPI.addUrl(args);
        console.log(url);

        return `${host}/${url}`;
      } catch (error) {}
    },
  },
};

module.exports = resolvers;
