import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { typeDefs, resolvers, models } from "./modules";
import { db } from "./db";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { addPreData } from "./fixture";
import mongoose from "mongoose";
import router from "./routers";

const app = express();
const httpServer = http.createServer(app);

const getMe = async (token) => {
  if (token) {
    try {
      const me = await jwt.verify(token, process.env.SECRET);
      return models.User.findById(me?.id);
    } catch (error) {
      throw new GraphQLError("Session Invalid or expired.", { extensions: { code: "UNAUTHENTICATED" } });
    }
  }
};

const startServer = async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    formatError: (error) => {
      // console.log('error: ', error);
      // const message = error.message.slice(error?.message?.lastIndexOf(":") + 1, error?.message?.length).trim();
      delete error?.extensions?.stacktrace;
      // return { ...error, message: message || error.message };
      return { ...error };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use("/", express.static(process.env.ASSETS_STORAGE));
  app.use("/user", router.userRouter);
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));


  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        if (req) {
          const me = await getMe(req?.headers["x-token"]);
          return { models, me, secret: process.env.SECRET };
        }
      },
    })
  );
  db()
    .then(async (res) => {
      addPreData();
      await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 5000 }, resolve));
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);
    })
    .catch((err) => {
      console.log("Mongodb connection error...!", err);
    });
};

process.on("uncaughtException", (err) => {
  console.error(err && err.stack);
});

startServer();
