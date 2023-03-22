import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { APPWRITE_DATABASE_ID, APPWRITE_USER_ID } from "@/utils/constants/service.constant";
import { message } from "antd";
import { Query } from "appwrite";
import appwrite from "./appwriteClient";

const userService = {

    getUserList: async () => {
        try {
            const res = await appwrite.provider().database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_USER_ID)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },


};

export default userService;
