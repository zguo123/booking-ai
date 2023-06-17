/**
 * YAN HU HAIR
 *
 * Logout the current user
 *
 * @author Zhaoyu Guo
 */

import { logout } from "@/lib/api/user/auth/authentication";
import { LogoutUserHandler } from "@/typings/user";

const logoutUserHandler: LogoutUserHandler = async (req, res) => {
  const { success, error, status } = await logout(
    res,
    req?.cookies?.token as string
  );

  if (success) {
    res.writeHead(302, { Location: "/auth/login" });
    res.end();
  } else {
    return res.status(status).json({
      success,
      status,
      error,
    });
  }
};

export default logoutUserHandler;
