import { ApolloServer } from 'apollo-server';
import * as express from 'express';
import { registerServer } from 'apollo-server-express';

import dbInit from './config/db';
import { middlewares } from './config/middlewares';
import { typeDefs, resolvers } from './graphqlSetup';
import { createMocks } from './utils/createMocks';

dbInit();

const app = express();

middlewares(app);

// @ts-ignore
export const server = new ApolloServer({
  // @ts-ignore
  typeDefs,
  // @ts-ignore
  resolvers,

  // @ts-ignore
  context: (ctx: any) => ({ user: ctx.req.user }),

  // formatError: (error: Error) => {
  //   return {
  //     message: error.message,
  //   };
  // },
});

registerServer({ server, app });

server.listen().then(async ({ url }: any) => {
  await createMocks();
  console.log(`🚀 Server ready at ${url}`);
});
