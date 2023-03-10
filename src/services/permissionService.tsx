import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { APPWRITE_COURSE_ID, APPWRITE_DATABASE_ID } from "@/utils/constants/service.constant";
import { message } from "antd";
import { Permission, Role } from "appwrite";
import appwrite from "./appwriteClient";


const permissionService = {
    createPermission: async (documentID: string) => {
        try {
            const res = await appwrite.provider().database.createDocument(APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID, documentID,
                [
                    Permission.read(Role.any()),                  // Anyone can view this document
                    Permission.update(Role.team("admin")),       // Admins can update this document
                    Permission.create(Role.team("admin")),
                    Permission.write(Role.team("admin")),
                    Permission.delete(Role.team("admin")),
                ]
            )
            if (res) return res
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    }
}

export default permissionService;
