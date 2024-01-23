import dotenv from "dotenv";
import express from "express";
import http from "http";
import ip from "ip";
import { Socket, Server as SocketIoServer } from "socket.io";
import cors from "./config/cors/cors.config";
import { authMiddleware } from "./middlewares/authentication.middleware";
import userRouter from "./routers/user.router";
import { searchSocket } from "./sockets/searchUser.socket";
// Environment variables
dotenv.config();

// Setup
const port = process.env.PORT || 8080;
const server = express();
server.use(cors);
server.use(express.json());

// Create http server and pass it to socket.io
const httpServer = http.createServer(server);
const io = new SocketIoServer(httpServer, { cors: { origin: process.env.CLIENT_ORIGIN || "*" } });

// Middlewares
server.use("/api", authMiddleware);

// Routers
server.use("/auth", userRouter);

// Sockets
io.on("connection", (socket: Socket) => {
  // Auth Socket
  // Friend Search Socket
  searchSocket(io, socket);
});

// Start the combined server
httpServer.listen(port, () => {
  console.log(`Server and Socket.IO started on: http://${ip.address()}:${port}`);
});
