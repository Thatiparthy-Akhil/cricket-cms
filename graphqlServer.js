require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Await the server start

  server.applyMiddleware({ app });

  app.listen({ port: 3000 }, () =>
    console.log(
      `🚀 GraphQL Server running at http://localhost:3000${server.graphqlPath}`
    )
  );
}

startServer();
