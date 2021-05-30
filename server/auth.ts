import User from "./models/User";
import { sign, verify } from "jsonwebtoken";
import Context from "Context";

const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '15m'},)
};

const createRefreshToken = (user: User) => {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '7d' })
};

const getTokenPayload = (context: Context) => {
  const authHeader = context.reply.request.headers.authorization;

  if (!authHeader) {
    throw new Error("Authorization header not found");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return payload
  } catch (err) {
    throw new Error("Not authenticated");
  }
}

export { createAccessToken, createRefreshToken, getTokenPayload }
