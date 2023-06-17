/**
 * YAN HU HAIR
 *
 * Socket Types
 *
 * @author Zhaoyu Guo
 */
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type NextSocket = {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type EmitSocketResponse = (
  res: NextSocket,
  event: string,
  data: unknown
) => void;

export type ConstructServiceString = (
  customerId: string
 ) => Promise<string>;
