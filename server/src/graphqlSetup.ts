import * as fs from 'fs';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = mergeTypes(fileLoader(`${__dirname}/modules/**/*.graphql`), { all: true });

export const resolvers = mergeResolvers(fileLoader(`${__dirname}/modules/**/resolvers.ts`), {
  all: true,
});

fs.writeFileSync('src/schema.graphql', typeDefs);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
