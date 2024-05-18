import { Client, Databases } from "appwrite";

export const AppwriteURL =
  import.meta.env.VITE_APPWRITE_URL || "https://cloud.appwrite.io/v1";

export const PORJECT_ID =
  import.meta.env.VITE_APPWRITE_PROJECT_ID || "66387c2d00392835a51c";

export const DATABASES_ID =
  import.meta.env.VITE_APPWRITE_DATABASES_ID || "66387c50002eb78ca32f";

export const COLLECTION_MESSAGE_ID =
  import.meta.env.VITE_APPWRITE_COLLECTION_MESSAGE_ID || "66387c5d003a16f1ed53";

export const client = new Client();
client.setEndpoint(AppwriteURL).setProject(PORJECT_ID);

export const databases = new Databases(client);
