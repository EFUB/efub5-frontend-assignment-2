import { MongoClient, type MongoClientOptions, type Db, type Collection } from "mongodb";
import type Post from "@/models/post";

const uri: string = process.env.DB_CONN_STRING!;
const DB_NAME: string = process.env.DB_NAME!;
const COLLECTION_POST_NAME: string = process.env.COLLECTION_POST_NAME!;
const options: MongoClientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: false, 
  retryWrites: true,
  w: "majority",
};

if (!uri || !DB_NAME || !COLLECTION_POST_NAME) {
  throw new Error(".env 설정이 올바르지 않습니다.");
}

let client: MongoClient;
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  connectDB = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  connectDB = client.connect();
}

async function getPostCollection(): Promise<Collection<Post>> {
  const db: Db = (await connectDB).db(DB_NAME);
  return db.collection<Post>(COLLECTION_POST_NAME);
}

export { connectDB, getPostCollection };
