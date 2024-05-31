import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://rajeevkumar:789123@cluster0.k76semo.mongodb.net/food-delivery-app?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB connected"));
};
