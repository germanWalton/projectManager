import { startApolloServer } from "./app.js";
import { typeDef } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { dbConnection } from "./db.js";

dbConnection();
startApolloServer(typeDef, resolvers);
