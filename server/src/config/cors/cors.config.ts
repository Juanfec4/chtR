import cors from "cors";
import { Router } from "express";

const corsMiddleware = Router();

corsMiddleware.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

export default corsMiddleware;
