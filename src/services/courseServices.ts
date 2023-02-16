import {
  APPWRITE_COURSE_ID,
  APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, Query } from "appwrite";
import appwrite from "./appwriteClient";

const courseServices = {
  getCourseList: async ({
    pageNo,
    pageSize,
    searchName,
  }: {
    pageNo: number;
    pageSize: number;
    searchName?: string;
  }) => {
    try {
      const res = await appwrite
        .provider()
        .database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID, [
          // Query.search('name', 'N3'),
          Query.limit(pageSize),
          Query.offset((pageNo - 1) * pageSize),
        ]);
      console.log("res", res);
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
  getOneCourse: async (documentId: string) => {
    try {
      const response = await appwrite
        .provider()
        .database.getDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COURSE_ID,
          documentId
        );
      if (response) {
        return response;
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message)
      }
      return null;
    }
  },
  createOneCourse: async (data: {
  }) => {
    try {
      const res = appwrite.provider().database.createDocument(APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID, ID.unique(), data)
      if (res) {
        return res
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message)
      }
      return null;
    }
  }
};

export default courseServices;
