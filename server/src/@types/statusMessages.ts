import { Messages } from "./global";

const messages: Messages = {
  error: {
    INVALID_BODY: "Invalid request body.",
    MISSING_REQUIRED_FIELDS: "Request body missing required fields.",
    INVALID_CREDENTIALS: "Invalid username or password.",
    USER_NOT_FOUND: "User not found.",
    PASSWORD_MATCHES_USERNAME: "Invalid password, must not match username.",
    INVALID_PASSWORD:
      "Invalid password, must be: 8-32 characters long, at least 1 number, at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 special character",
    UNKNOWN: "Unknown error.",
    ER_CHECK_CONSTRAINT_VIOLATED: "Invalid input.",
    ER_DUP_ENTRY: "Resource already exists.",
  },
  success: {
    CREATED: "Created successfully.",
  },
};
export default messages;
