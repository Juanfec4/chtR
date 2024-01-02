import bcrypt from "bcryptjs";

//Hash password
export const hashPassword = (password: string): string => {
  let hash = bcrypt.hashSync(password, 10);
  return hash;
};

//Compare passwords
export const comparePassword = (password: string, hash: string): boolean => {
  let isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
