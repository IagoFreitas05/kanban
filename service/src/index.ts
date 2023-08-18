import express from "express";
import mongoose from "mongoose";
import path from "node:path";
import {router} from "./router";
import http from "node:http";
import {Server} from "socket.io";
import {createUserOnStartup} from "./app/useCases/users/CreateUserOnStartup";

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect("mongodb://localhost:27017").then(() => {
  const port = 3001;

  app.use(express.json());
  app.use(router);

  server.listen(port, () => {
    console.log(`🏳️ the server is running in peace on ${port}`);
  });

  console.log("conectado ao mongo");
  createUserOnStartup();
}).catch(() => {
  console.log("erro ao conectar ao mongo");
});
