import { APPWRITE_IMAGE_BUCKET_ID } from "@/utils/constants/service.constant";
import { message } from "antd";
import { ID, UploadProgress } from "appwrite";
import appwrite from "./appwriteClient";

const fileService = {
  uploadImage: async (
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ) => {
    try {
      const response = await appwrite
        .provider()
        .storage.createFile(
          APPWRITE_IMAGE_BUCKET_ID,
          ID.unique(),
          file,
          undefined,
          (progress: UploadProgress) => {
            console.log('progress', progress)
            if (onProgress) onProgress(progress);
          }
        );
      if (response) return response;
    } catch (error: any) {
      if ("message" in error) {
        message.error(error.message);
      }
    }
  },
  previewImage: (
    fileId: string,
    fileOption?: {
      width?: number | undefined;
      height?: number | undefined;
      gravity?: string | undefined;
      quality?: number | undefined;
      borderWidth?: number | undefined;
      borderColor?: string | undefined;
      borderRadius?: number | undefined;
      opacity?: number | undefined;
      rotation?: number | undefined;
      background?: string | undefined;
      output?: string | undefined;
    }
  ) => {
    return appwrite
      .provider()
      .storage.getFilePreview(
        APPWRITE_IMAGE_BUCKET_ID,
        fileId,
        fileOption?.width,
        fileOption?.height,
        fileOption?.gravity,
        fileOption?.quality,
        fileOption?.borderWidth,
        fileOption?.borderColor,
        fileOption?.borderRadius,
        fileOption?.opacity,
        fileOption?.rotation,
        fileOption?.background,
        fileOption?.output
      );
  },
};

export default fileService;
