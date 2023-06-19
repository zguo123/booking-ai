/**
 * YAN HU HAIR
 *
 * Authentication Handlers
 *
 * ADDITIONAL NOTES:
 * All the authentication helpers available for the authentication
 *
 * @author Zhaoyu Guo
 */
import {
  JWTSign,
  JWTVerify,
  removeTokenCookie,
  setTokenCookie,
} from "@/lib/cookies";
import logger from "@/lib/logger";
import UserModel from "@/models/UserModel";
import {
  AuthenticateUser,
  CheckIsAuthenticated,
  LogoutUser,
  RemoveToken,
  RetrieveUserMetadata,
  SetSecureToken,
  VerifySecureToken,
} from "@/typings/user";
import { Magic } from "@magic-sdk/admin";
import { StatusCodes } from "http-status-codes";

const magic = new Magic(process.env.MAGIC_SECRET_KEY as string);

/**
 * Check the authentication status of a user via their token cookie
 *
 * @param token the token cookie
 * @returns If the user is user is authenticated or not
 */
export const isAuthenticated: CheckIsAuthenticated = (token) => {
  return !!token;
};
/**
 * Retrieve user metadata
 *
 * @param authToken The authentication token
 * @returns The user metadata
 */
export const retrieveUserData: RetrieveUserMetadata = async (authToken) => {
  await magic.token.validate(authToken as string);

  return await magic.users.getMetadataByToken(authToken);
};

/**
 * Create token cookie
 *
 * @param userData The user data
 * @returns The token cookie
 */
export const createTokenCookie: SetSecureToken = async (userData) => {
  return await JWTSign(
    {
      ...userData,
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * Number(process.env.SESSION_LENGTH_IN_DAYS as string),
    },
    process.env.JWT_SECRET as string
  );
};

/**
 * Verify token cookie
 *
 * @param token The token cookie
 * @return The token payload
 */
export const verifyToken: VerifySecureToken = async (token) => {
  return await JWTVerify(token, process.env.JWT_SECRET as string);
};

/**
 * Authenticate a user
 *
 * @param token The token cookie
 * @param res The response object
 * @returns The authentication result
 */
export const authenticate: AuthenticateUser = async (token, res) => {
  try {
    const user = await retrieveUserData(token);

    const userProfile = await UserModel.findOne({ email: user.email });

    if (user) {
      const tokenCookie = await createTokenCookie(user);
      setTokenCookie(res, tokenCookie);
    }

    if (userProfile) {
      userProfile.lastLogin = new Date();
      await userProfile.save();
    }

    return {
      success: true,
      error: user ? undefined : { message: "User not found" },
      status: StatusCodes[user ? "OK" : "UNAUTHORIZED"],
      authUser: user,
    };
  } catch (error: any) {
    logger.error(`[AUTHENTICATION] ${error.message}`);
    return {
      success: false,
      error: {
        message: error.message,
      },
      status: StatusCodes.UNAUTHORIZED,
    };
  }
};

/**
 * Logouts a user
 *
 * @param res The response object
 * @param token The token cookie
 * @returns The logout result
 */
export const logout: LogoutUser = async (res, token) => {
  if (!isAuthenticated(token)) {
    return {
      success: false,
      error: {
        message: "User not authenticated",
      },
      status: StatusCodes.UNAUTHORIZED,
    };
  }

  try {
    // get token
    const user: any = await verifyToken(token);

    // remove the token from the cookie
    removeTokenCookie(res);

    // logout the user
    await magic.users.logoutByIssuer(user?.issuer);

    return {
      success: true,
      status: StatusCodes.OK,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        message: error.message,
      },
      status: StatusCodes.UNAUTHORIZED,
    };
  }
};
