import jwt, { JwtPayload } from "jsonwebtoken";

//Sign key
const SECRET = process.env.TOKEN_SECRET || "TEST";

//Create token
const createToken = async (username: string, name: string, id: number, seed: string) => {
  let token = await jwt.sign({ username, name, id, avatarSeed: seed }, SECRET, { expiresIn: "1d" });
  return token;
};

//Decode token
const decodeToken = (token: string): JwtPayload => {
  let decoded = jwt.decode(token) as JwtPayload;
  return decoded;
};

//Verify token
const verifyToken = async (token: string): Promise<JwtPayload | null> => {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded;
  } catch (error: any) {
    return null;
  }
};

export default { createToken, decodeToken, verifyToken };
