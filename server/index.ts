import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { typeDefs } from "./types/typeDefs";
import { resolvers } from "./resolvers";
import Router from "./routes";

const port = 4000;
const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const main = async () => {
  await server.start();

  app.use(express.json());
  app.use(cors());
  app.use(Router);
  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port }, () => resolve(undefined)));
  console.log(`🚀 Server ready at port ${port}`);
};

main();
