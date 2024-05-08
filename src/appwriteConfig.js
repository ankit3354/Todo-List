import { Client, Databases } from "appwrite";

export const DATABASES_ID = "66387c50002eb78ca32f";
export const COLLECTION_MESSAGE_ID = "66387c5d003a16f1ed53";

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66387c2d00392835a51c");

export const databases = new Databases(client);
