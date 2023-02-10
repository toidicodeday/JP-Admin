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
};

export default authService;
