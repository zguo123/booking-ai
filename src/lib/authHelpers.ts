import { AuthProviderProps, AuthToken } from "@saas-ui/auth";
import { Magic } from "magic-sdk";

export const authService = (client: any): AuthProviderProps => {
  let token: AuthToken;
  let expireTime = 0;

  const onLogin = async (params: any): Promise<any> => {
    return await client.auth.loginWithEmailOTP(params);
  };

  const onLogout = async () => {
    token = null;
    expireTime = 0;
    return await client.user.logout();
  };

  const onLoadUser = async (): Promise<any> => {
    if (await client.user.isLoggedIn()) {
      return await client.user.getMetadata();
    }
  };

  const onGetToken = async () => {
    if (!token || Date.now() <= expireTime) {
      expireTime = Date.now() + 600; // now + 10 min
      token = await client.user.getIdToken();
    }

    return token;
  };

  return {
    onLogin,
    onLogout,
    onLoadUser,
    onGetToken,
  };
};
