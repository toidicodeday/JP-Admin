import {
  APPWRITE_COURSE_ID,
  APPWRITE_DATABASE_ID,
} from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, Models, Query } from "appwrite";
import appwrite from "./appwriteClient";
import { CourseType } from "./commonType";
import { sendNoti } from "./sendNoti";

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
      const res: Models.DocumentList<CourseType> = await appwrite
        .provider()
        .database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COURSE_ID, [
          ...(searchName ? [Query.search("name", searchName)] : []),
          Query.limit(pageSize),
          Query.offset((pageNo - 1) * pageSize),
          Query.orderDesc('$updatedAt')
        ]);
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
  getOneCourse: async (documentID: string) => {
    try {
      const response: CourseType = await appwrite
        .provider()
        .database.getDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COURSE_ID,
          documentID
        );
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
  createOneCourse: async (data: {}) => {
    try {
      const res = appwrite
        .provider()
        .database.createDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COURSE_ID,
          ID.unique(),
          data
        );
      if (res) {
        // await sendNoti({ title: data.name, content: data.desc })
        return res;
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
      return null;
    }
  },
  deleteOneCourse: async (courseID: string) => {
    try {
      const res = appwrite
        .provider()
        .database.deleteDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COURSE_ID,
          courseID
        )
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
  upDateOneCourse: async (documentID: string, data: {}) => {
    try {
      const res = appwrite
        .provider()
        .database.updateDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_COURSE_ID,
          documentID,
          data
        )
      if (res) {
        return res;
      }
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
      return null;
    }
  }
};

export default courseServices;
