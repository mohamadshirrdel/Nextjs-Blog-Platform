import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/devlog";

export async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
