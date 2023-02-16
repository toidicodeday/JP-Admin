import {
    APPWRITE_QUESTION_ID,
    APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, Query } from "appwrite";
import appwrite from "./appwriteClient";

const questionService = {
    getQuestionList: async () => {
        const response = await appwrite.provider().database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_QUESTION_ID)
        return response
    }
};

export default questionService;
