import { ApolloServer } from 'apollo-server';
import * as express from 'express';
import { registerServer } from 'apollo-server-express';

import dbInit from './config/db';
import { middlewares } from './config/middlewares';
import { typeDefs, resolvers } from './graphqlSetup';

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
});

registerServer({ server, app });

server.listen().then(({ url }: any) => {
  console.log(`🚀 Server ready at ${url}`);
});
