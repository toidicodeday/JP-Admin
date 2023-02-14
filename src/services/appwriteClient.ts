import { APPWRITE_DATABASE_ID, APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/utils/constants/service.constant";
import { Account, Client, Databases } from "appwrite";

type Nullable<T> = { [K in keyof T]: T[K] | null };

type SDK_APPWRITE = {
  database: Databases;
  account: Account;
  client: Client;
};

const severInfo = {
  endpoint: APPWRITE_ENDPOINT,
  project: APPWRITE_PROJECT,
  databaseID: APPWRITE_DATABASE_ID,
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


