import { GraphQLServer } from 'graphql-yoga';

import dbInit from './config/db';

dbInit();

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
