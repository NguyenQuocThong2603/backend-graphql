const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');

const { makeExecutableSchema } = require('@graphql-tools/schema');

const datasources = require('./datasources');
const createContext = require('./context');
const typeDefs = require('./schemas');

const resolvers = require('./resolvers');

const app = express();

app.use(cors());

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  dataSources: datasources,
  context: createContext,
});

server.applyMiddleware({ app, path: '/' });
module.exports = app;
