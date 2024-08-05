import jwt from "jsonwebtoken";
import { privateKey as storedPrivateKey, publicKey as storedPublicKey } from "../config/keys";

const privateKey = storedPrivateKey;
const publicKey = storedPublicKey;

export function signJWT(payload: Object, options: jwt.SignOptions) {
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decodedToken = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decodedToken,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: true,
      decodedToken: null,
    };
  }
}
