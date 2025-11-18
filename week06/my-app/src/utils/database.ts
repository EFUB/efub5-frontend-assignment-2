import { MongoClient, type MongoClientOptions, type Db, type Collection } from "mongodb";
import type Post from "@/models/post";
import type User from "@/models/user";

const url: string = process.env.DB_CONN_STRING || "";
const DB_NAME: string = process.env.DB_NAME || "";
const COLLECTION_POST_NAME: string = process.env.COLLECTION_POST_NAME || "";
const options: MongoClientOptions = {};
const COLLECTION_USER_NAME: string = process.env.COLLECTION_USER_NAME || "";

let client: MongoClient;
let connectDB: Promise<MongoClient>;
if (!url || !DB_NAME || !COLLECTION_POST_NAME || !COLLECTION_USER_NAME) {
  throw new Error(".env.local 파일에 변수 설정이 필요합니다.");
}

if (!url || !DB_NAME || !COLLECTION_POST_NAME) {
  throw new Error(".env 설정을 확인해 주세요.");
}
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(url, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  connectDB = (global as any)._mongoClientPromise;
  } else {
    client = new MongoClient(url, options);
    connectDB = client.connect();
}

const db: Db = (await connectDB).db(DB_NAME);
const postCollection: Collection<Post> = db.collection<Post>(COLLECTION_POST_NAME);

export { connectDB, postCollection };
export async function getUserCollection(): Promise<Collection<User>> {
  const client = await connectDB;
  const db: Db = client.db(DB_NAME);
  return db.collection<User>(COLLECTION_USER_NAME);
}

