require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const ShortenUrlAPI = require('./datasource/shortenurl');

const app = express();
const port = process.env.PORT || 3000;
const path = '/graphiql';

const prisma = new PrismaClient();
const dataSources = () => ({
  shortenUrlAPI: new ShortenUrlAPI({ prisma }),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      host: `${req.protocol}://${req.headers.host}`,
    };
  },
  dataSources,
});

server.applyMiddleware({ app, path });

app.get('/', (req, res, next) => {});

app.get('/:url', async (req, res) => {
  try {
    const db = dataSources();
    const url = await db.shortenUrlAPI.findUrl(req.params);
    if (!url) {
      return res.status(404).json({
        error: 'Url does not exist',
      });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(404).json({
      error: 'A server error occurred',
    });
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
