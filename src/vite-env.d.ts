/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string
  readonly VITE_APPWRITE_PROJECT: string
  readonly VITE_APPWRITE_DATABASE_ID: string
  readonly VITE_APPWRITE_COLLECTION_ID_COURSE: string
  readonly VITE_APPWRITE_COLLECTION_ID_LESSON: string
  readonly VITE_APPWRITE_COLLECTION_ID_QUESTION: string
  readonly VITE_APPWRITE_COLLECTION_ID_USER: string
  // more env variables...
}
