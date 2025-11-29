import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Add food item func
// So whenever addFood api gets clicked, in the body sending these details and access it in the backend using this function
// Using add food api function, new food items can be added in DB.
const addFood = async (req, res) => {
  // let image_filename = `${req.file.filename}`;

  // const food = new foodModel({
  //   name: req.body.name,
  //   description: req.body.description,
  //   price: req.body.price,
  //   category: req.body.category,
  //   image: image_filename,
  // });

  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !req.file) {
      return res.json({
        success: false,
        message: "Missing required fields!",
      });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    // Save to database
    const food = new foodModel({
      name,
      description,
      price: Number(price),
      category,
      image: imageUrl,
      cloudinary_id: imageUpload.public_id,
    });

    await food.save();

    res.json({ success: true, message: "Food Added Successfully!" });
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
    const { id } = req.body;
    const food = await foodModel.findById(id);

    if (!food) {
      return res.json({ success: false, message: "Food not found!" });
    }

    // Delete from Cloudinary
    if (food.cloudinary_id) {
      await cloudinary.uploader.destroy(food.cloudinary_id);
    }

    // Delete from DB
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food Removed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
