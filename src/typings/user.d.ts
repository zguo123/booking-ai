/**
 * YAN HU HAIR
 *
 * User Types
 *
 * @author Zhaoyu Guo
 */
import { JWTPayload } from "jose";
import { MagicUserMetadata } from "magic";
import mongoose, { Document, ObjectId, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { APIRet, Override } from "./global";

// database schemas
export interface IUserItems {
  _id?: string;
  firstName: string;
  lastName: string;
  lastLogin?: Date;
  email: string;
  username: string;
}

export type UserParams = Pick<
  IUserItems,
  "username" | "email" | "firstName" | "lastName"
>;

export type UserItemsWithoutId = Omit<IUserItems, "_id">;

// documents
export type UserDocument = Document<Types.ObjectId> & UserItemsWithoutId;

// response data
export type UserResponse = APIRet & {
  user?: IUserItems | null;
  authUser?: MagicUserMetadata | null;
};

// request types
export type AuthenticationRequest = Override<NextApiRequest>;

export type CheckUsernameRequest = Override<
  NextApiRequest,
  {
    body: {
      username: string;
    };
  }
>;

export type CreateUserRequest = Override<
  NextApiRequest,
  {
    body: {
      user: IUserItems;
    };
  }
>;

export const GetUserRequest = NextApiRequest;

// handler types
export type AuthenticateUserHandler = (
  req: AuthenticationRequest,
  res: NextApiResponse<UserResponse>
) => unknown;

export type CreateUserHandler = (
  req: CreateUserRequest,
  res: NextApiResponse<UserResponse>
) => unknown;

export type LogoutUserHandler = (
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) => unknown;

export type CheckUsernameHandler = (
  req: CheckUsernameRequest,
  res: NextApiResponse<UserResponse>
) => unknown;

export type GetUserHandlerInfoHandler = (
  req: GetUserRequest,
  res: NextApiResponse<UserResponse>
) => unknown;

// helper types
export type RetrieveUserMetadata = (
  authToken: string
) => Promise<MagicUserMetadata>;

export type SetSecureToken = (userData: MagicUserMetadata) => Promise<string>;

export type VerifySecureToken = (
  secureToken: string
) => Promise<JWTPayload | undefined>;

export type AuthenticateUser = (
  token: string,
  res: NextApiResponse<UserResponse>
) => Promise<UserResponse>;

export type LogoutUser = (
  res: NextApiResponse<UserResponse>,
  token: string
) => Promise<UserResponse>;

export type CheckUsername = (username: string) => Promise<UserResponse>;

export type CheckIsAuthenticated = (token: string) => boolean;

export type RemoveToken = (res: NextApiResponse<UserResponse>) => Promise<void>;

export type CreateUser = (user: IUserItems) => Promise<UserResponse>;

export type GetUser = (token: string) => Promise<UserResponse>;
