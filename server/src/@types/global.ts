import { Request } from "express";

export type Messages = {
  error: {
    [key: string]: string;
  };
  success: {
    [key: string]: string;
    CREATED: "Created successfully.";
  };
};

export interface AuthenticatedRequest extends Request {
  user?: any;
}
