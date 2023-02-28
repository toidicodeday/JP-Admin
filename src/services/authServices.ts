import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { message } from "antd";
import appwrite from "./appwriteClient";

const authService = {
  login: async (payload: { email: string; password: string }) => {
    const response = appwrite
      .provider()
      .account.createEmailSession(payload.email, payload.password)
      .then((res) => res)
      .catch((err) => {
        message.error(err.message);
        return null;
      });

    return response;
  },
  getMe: () => {
    return appwrite.provider().account.get();
  },
  updateUserMeName: async ({ name }: { name: string }) => {
    const response = await appwrite
      .provider()
      .account.updateName(name)
      .then((res) => res)
      .catch((error) => {
        message.error(error.message || DEFAULT_ERR_MESS);
      });
    return response;
  },
  updateUserMePref: async (userPrefs: object) => {
    try {
      const response = await appwrite.provider().account.updatePrefs(userPrefs);
      if (response) return response;
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS);
    }
  },
  updateUserMePassword: async (data: { password: string, oldPassword: string }) => {
    try {
      const response = await appwrite.provider().account.updatePassword(data.password, data.oldPassword)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  },
  recoveryPassword: async (email: string, url: string) => {
    try {
      const response = await appwrite.provider().account.createRecovery(email, url)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  },
  recoveryPasswordConfirm: async (userID: string, secret: string, password: string, rePassword: string) => {
    try {
      const response = await appwrite.provider().account.updateRecovery(userID, secret, password, rePassword)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  }
};

export default authService;
