import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item func
// So whenever addFood api gets clicked, in the body sending these details and access it in the backend using this function
// Using add food api function, new food items can be added in DB.
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error", error: error });
  }
};

// All food list func- so that it can be accessed and send them as response.
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item func-
const removeFood = async (req, res) => {
  try {
    // Find the food model using the id
    const food = await foodModel.findById(req.body.id);

    // removing from file system and uploads folder
    fs.unlink(`uploads/${food.image}`, () => {});

    // removing from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
