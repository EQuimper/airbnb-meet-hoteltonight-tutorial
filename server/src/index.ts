import * as fs from 'fs';
import { GraphQLServer } from 'graphql-yoga';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import dbInit from './config/db';

dbInit();

const typeDefs = mergeTypes(fileLoader(`${__dirname}/modules/**/*.graphql`), { all: true });

const resolvers = mergeResolvers(fileLoader(`${__dirname}/modules/**/resolvers.ts`), { all: true });

fs.writeFileSync('src/schema.graphql', typeDefs);

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is running on localhost:4000'));
