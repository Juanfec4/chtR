import { Request, Response } from "express";
import statusMessages from "../@types/statusMessages";
import { comparePassword, hashPassword } from "../services/hash.service";
import jwtService from "../services/jwt.service";
import userService from "../services/user.service";
import { hasUndefined, isValidPassword, isValidPayload } from "../validators/payload.validator";

//Register
const register = async (request: Request, response: Response) => {
  //Check for presence of keys
  if (!isValidPayload(request.body, ["username", "name", "password", "seed"])) {
    return response.status(400).json(statusMessages.error.INVALID_BODY);
  }
  //Extract payload
  let { username, name, password, seed } = request.body;

  //Check if values are missing
  if (hasUndefined([username, name, password, seed])) {
    return response.status(400).json(statusMessages.error.MISSING_REQUIRED_FIELDS);
  }

  //Check if password matches username
  if (password.toLowerCase() === username.toLowerCase()) {
    return response.status(400).json(statusMessages.error.PASSWORD_MATCHES_USERNAME);
  }

  //Check if password is valid
  if (!isValidPassword(password)) {
    return response.status(400).json(statusMessages.error.INVALID_PASSWORD);
  }

  //Create password hash
  let hashedPassword = hashPassword(password);

  //Create user
  let { isError, errorMessage, errNo } = await userService.createUser(
    username,
    name,
    hashedPassword,
    seed
  );
  //Check if it is an error
  if (isError && errorMessage) {
    //Special error cases
    let errDescription = "";
    if (errNo === 1062) errDescription = "Username taken.";
    if (errNo === 3819) errDescription = "Name or username contains forbidden characters.";

    //Return error message
    return response
      .status(500)
      .json(
        (statusMessages.error[errorMessage] || statusMessages.error.UNKNOWN) + " " + errDescription
      );
  }

  //Return success response
  return response.status(201).json(statusMessages.success.CREATED);
};

//Login
const login = async (request: Request, response: Response) => {
  //Check for presence of keys
  if (!isValidPayload(request.body, ["username", "password"])) {
    return response.status(400).json(statusMessages.error.INVALID_BODY);
  }
  //Extract payload
  let { username, password } = request.body;

  //Check if values are missing
  if (hasUndefined([username, password])) {
    return response.status(400).json(statusMessages.error.MISSING_REQUIRED_FIELDS);
  }

  //Get user
  let { user, isError, errorMessage } = await userService.getUserByUsername(username);

  //Handle errors
  if (isError) {
    return response.status(500).json(errorMessage || statusMessages.error.UNKNOWN);
  }

  //No user found
  if (!user) {
    return response.status(404).json(statusMessages.error.USER_NOT_FOUND);
  }

  //Compare passwords
  if (!comparePassword(password, user.password) || user.id === undefined) {
    return response.status(403).json(statusMessages.error.INVALID_CREDENTIALS);
  }

  //Create JWT
  let token = await jwtService.createToken(user.username, user.name, user.id, user.seed);

  //Return token
  return response.status(200).json({ authToken: token });
};

//Update seed or displayname
const updateUser = async (request: Request, response: Response) => {
  //Check if token is present
  if (!request.headers.authorization) {
    return response.status(400).json(statusMessages.error.MISSING_TOKEN);
  }

  //Extract token
  const authToken = request.headers.authorization;

  //Decode token
  const decoded = (await jwtService.verifyToken(authToken)) as any;

  //Check if token is valid
  if (!decoded || !decoded.id) {
    return response.status(400).json(statusMessages.error.INVALID_TOKEN);
  }
  //Extract payload
  let { newSeed, newName } = request.body;

  //Update user
  let { isError, errorMessage, user, errNo } = await userService.updateUser(decoded.id, {
    newSeed,
    newName,
  });

  //Could not update
  if (isError) {
    let errDescription = "";
    if (errNo === 3819) errDescription = "Name contains forbidden characters.";
    return response.status(500).json(errorMessage || errDescription);
  }
  if (!user || !user.id) {
    return response.status(500).json(statusMessages.error.UNKNOWN);
  }
  //Create JWT
  let token = await jwtService.createToken(user.username, user.name, user.id, user.seed);

  //Return token
  return response.status(200).json({ newAuthToken: token });
};
export default { register, login, updateUser };
