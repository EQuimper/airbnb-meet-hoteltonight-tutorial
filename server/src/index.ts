import { GraphQLServer } from 'graphql-yoga';

import dbInit from './config/db';
import { typeDefs, resolvers } from './graphqlSetup';

dbInit();

export const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
