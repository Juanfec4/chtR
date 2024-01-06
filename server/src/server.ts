import dotenv from "dotenv";
import express from "express";
import ip from "ip";
import cors from "./config/cors/cors.config";
import userRouter from "./routers/user.router";

//Environment variables
dotenv.config();

//Setup
const port = process.env.PORT || 8080;
const server = express();
server.use(cors);
server.use(express.json());

//Middlewares

//Routers
server.use("/auth", userRouter);

server.listen(port, () => {
  console.log(`Server started on: http://${ip.address()}:${port}`);
});
