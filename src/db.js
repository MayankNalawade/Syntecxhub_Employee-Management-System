import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export async function connectDb() {
  const useMemory =
    process.env.USE_MEMORY_DB === "true" || !process.env.MONGODB_URI;

  if (useMemory) {
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    await mongoose.connect(uri);
    console.log("Connected to in-memory MongoDB");
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
}

export async function disconnectDb() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
}
