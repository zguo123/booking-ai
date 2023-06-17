/**
 * YAN HU HAIR
 *
 * Cookies Handlers
 * A library function to help with login
 *
 * More here:
 * https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs
 *
 * @author Zhaoyu Guo
 */

import { serialize } from "cookie";
import { NextApiResponse } from "next";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const TOKEN_NAME = "token";
const MAX_AGE =
  60 * 60 * 24 * Number(process.env.SESSION_LENGTH_IN_DAYS as string);

const DEMO_MAX_AGE = 60 * 60 * 2; // 2 hours

export async function JWTSign(
  payload: JWTPayload,
  secret: string
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(payload.exp || iat + MAX_AGE)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function JWTVerify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload;
}

export function setTokenCookie(
  res: NextApiResponse<any>,
  token: string,
  isDemo?: boolean
) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + (isDemo ? DEMO_MAX_AGE : MAX_AGE) * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // if true, cookie will only be set if https (won't be set if http)
    path: "/",
    sameSite: "lax",
  });
  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res: NextApiResponse<any>) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}
