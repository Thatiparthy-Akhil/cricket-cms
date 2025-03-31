require('dotenv').config(); // Load environment variables from .env
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema'); // Assuming you have a schema.js file
const resolvers = require('./resolvers'); // Assuming you have a resolvers.js file

async function startServer() {
  const app = express();

  // Apply other middleware if needed, but not authentication for GraphQL
  // app.use(authenticateToken); // Comment out or remove this line if it's applied globally

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start(); // Await the server start

  server.applyMiddleware({ app });

  // Change the port number to 3000
  app.listen({ port: 3000 }, () =>
    console.log(`🚀 GraphQL Server running at http://localhost:3000${server.graphqlPath}`)
  );
}

startServer();