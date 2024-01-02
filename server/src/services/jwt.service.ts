import jwt from "jsonwebtoken";

//Sign key
const SECRET = process.env.TOKEN_SECRET || "TEST";

//Create token
const createToken = async (username: string, name: string, id: number) => {
  let token = await jwt.sign({ username, name, id }, SECRET, { expiresIn: "1d" });
  return token;
};

export default { createToken };
