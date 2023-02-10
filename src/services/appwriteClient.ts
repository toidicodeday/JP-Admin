import { Account, Client, Databases } from "appwrite";

type Nullable<T> = { [K in keyof T]: T[K] | null };

type SDK_APPWRITE = {
  database: Databases;
  account: Account;
  client: Client;
};

const severInfo = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  project: import.meta.env.VITE_APPWRITE_PROJECT,
  collectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
};

let appwrite = {
  sdk: {
    database: null,
    account: null,
    client: null,
  } as Nullable<SDK_APPWRITE>,
  provider: (): SDK_APPWRITE => {
    if (appwrite.sdk.client) {
      return appwrite.sdk as SDK_APPWRITE;
    }
    let client = new Client()
      .setEndpoint(severInfo.endpoint)
      .setProject(severInfo.project);
    const account = new Account(client);
    const database = new Databases(client);

    appwrite.sdk = { database, account, client };
    return appwrite.sdk as SDK_APPWRITE;
  },
};

export default appwrite;
