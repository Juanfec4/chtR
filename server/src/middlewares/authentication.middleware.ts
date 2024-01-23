import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../@types/global";
import messages from "../@types/statusMessages";
import jwtService from "../services/jwt.service";

export const authMiddleware = (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) => {
  //Extract token (check if exists)
  const token = request.headers.authorization;
  //If no token return error
  if (!token) {
    return response.status(401).json(messages.error.MISSING_TOKEN);
  }
  try {
    //Decode token
    const decoded = jwtService.decodeToken(token);

    // Attach the decoded user information to the request object
    request.user = decoded;

    // Continue with the next middleware or route handler
    next();
  } catch (error: any) {
    // If the token is invalid, return an error
    return response.status(401).json(messages.error.INVALID_TOKEN);
  }
};
