import { GraphQLServer } from 'graphql-yoga';
import * as fs from 'fs';

import dbInit from './config/db';
import { typeDefs, resolvers } from './graphqlSetup';

dbInit();

fs.writeFileSync('src/schema.graphql', typeDefs);

export const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on http://localhost:4000'));
