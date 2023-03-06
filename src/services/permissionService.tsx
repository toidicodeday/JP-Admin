import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { APPWRITE_DATABASE_ID } from "@/utils/constants/service.constant";
import { message } from "antd";
import appwrite from "./appwriteClient";


const permissionService = {
    createPermission: async () => {
        try {
            //   const res = await appwrite.provider().database.createDocument(APPWRITE_DATABASE_ID, )
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    }
}

export default permissionService;
