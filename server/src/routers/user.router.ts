import { Request, Response, Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

//Sign up
router.post("/register", (request: Request, response: Response) =>
  userController.register(request, response)
);

//login
router.post("/login", (request: Request, response: Response) =>
  userController.login(request, response)
);

export default router;
