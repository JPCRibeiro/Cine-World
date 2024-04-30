import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("Erro:", error);
  }
};