import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const signJwt = (payload: object, expiresIn: string = "7d") => {
  const options: SignOptions = { expiresIn: expiresIn } as SignOptions;
  return jwt.sign(payload, JWT_SECRET as string, options);
};
//SignOptions is an interface that specified the algorithm, keyid, expiresIn, jwtid, etc.
//as is a type assertion
export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
