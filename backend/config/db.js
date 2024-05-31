import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error:", err));
};
