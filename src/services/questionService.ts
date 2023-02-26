import {
    APPWRITE_QUESTION_ID,
    APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { RetweetOutlined } from "@ant-design/icons";
import { message } from "antd";
import { ID, Query } from "appwrite";
import appwrite from "./appwriteClient";

const questionService = {
    getQuestionList: async (lessonID: string) => {
        try {
            const response = await appwrite.provider().database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_QUESTION_ID, [
                Query.equal('lessonID', lessonID),
                Query.orderAsc('sort')
            ])
            if (response) {
                return response
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
        }
    },
    getOneQuestion: async (questionID: string) => {
        try {
            const response = await appwrite.provider().database.getDocument(APPWRITE_DATABASE_ID, APPWRITE_QUESTION_ID, questionID)
            if (response) {
                return response
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
        }
    },
    createOneQuestion: async (data: {}) => {
        try {
            const response = await appwrite.provider().database.createDocument(APPWRITE_DATABASE_ID, APPWRITE_QUESTION_ID, ID.unique(), data)
            if (response) {
                return response
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
            return null
        }
    },
    deleteOneQuestion: async (questionID: any) => {
        try {
            const res = appwrite
                .provider()
                .database.deleteDocument(
                    APPWRITE_DATABASE_ID,
                    APPWRITE_QUESTION_ID,
                    questionID
                );
            if (res) {
                return res;
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message);
            }
            return null;
        }
    },
    updateOneQuestion: async (questionID: any, data: {}) => {
        try {
            const response = await appwrite.provider().database.updateDocument(APPWRITE_DATABASE_ID, APPWRITE_QUESTION_ID, questionID, data)
            if (response) {
                return response
            }
        } catch (error: any) {
            if ("message" in error) {
                message.error(error.message)
            }
            return null
        }
    }
};

export default questionService;
