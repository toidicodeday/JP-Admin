import {
    APPWRITE_LESSON_ID,
    APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, Query } from "appwrite";
import appwrite from "./appwriteClient";

const lessonService = {
    getLessonList: async () => {
        try {
            const response = await appwrite.provider().database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_LESSON_ID)
            if (response) {
                return response;
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
            return null
        }
    },
    getOneLesson: async (documentId: string) => {
        try {
            const response = await appwrite.provider().database.getDocument(APPWRITE_DATABASE_ID, APPWRITE_LESSON_ID, documentId)
            if (response) {
                return response;
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
            return null
        }
    }
};

export default lessonService;
