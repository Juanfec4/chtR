import { JwtPayload, jwtDecode } from "jwt-decode";

const decodeToken = (token: string): JwtPayload | null => {
  if (!token) return null;

  //Decode token
  return jwtDecode(token);
};

const getExpirationDate = (payload: JwtPayload | null): Date => {
  const expirationDate = new Date(payload?.exp ? payload.exp * 1000 - 3600 : Date.now() + 82800); //Expiration - 1 hour or now + 23 hours

  return expirationDate;
};
export default { decodeToken, getExpirationDate };
