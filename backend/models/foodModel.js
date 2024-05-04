import mongoose from "mongoose";

// Create the Schema for describing the food model properties.
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create the Model
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
