import {
  APPWRITE_LESSON_ID,
  APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, Models, Query } from "appwrite";
import appwrite from "./appwriteClient";
import { LessonType } from "./commonType";

const lessonService = {
  getLessonList: async (courseID: string) => {
    try {
      const response: Models.DocumentList<LessonType> = await appwrite
        .provider()
        .database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_LESSON_ID, [
          Query.equal("courseID", courseID),
          Query.orderAsc('sort')
        ]);
      if (response) {
        return response;
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
      return null;
    }
  },
  getOneLesson: async (lessonID: string) => {
    try {
      const response = await appwrite
        .provider()
        .database.getDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_LESSON_ID,
          lessonID
        );
      if (response) {
        console.log("response", response);
        return response;
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
      return null;
    }
  },
  createOneLesson: async (data: {}) => {
    try {
      const res = appwrite
        .provider()
        .database.createDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_LESSON_ID,
          ID.unique(),
          data
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
  deleteOneLesson: async (lessonID: string) => {
    try {
      const res = appwrite
        .provider()
        .database.deleteDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_LESSON_ID,
          lessonID
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
  updateOneLesson: async (lessonID: string, data: {}) => {
    try {
      const res = appwrite
        .provider()
        .database.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_LESSON_ID,
          lessonID,
          data
        );
      if (res) {
        return res
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
      return null;
    }
  }
};

export default lessonService;
