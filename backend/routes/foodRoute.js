import express from "express";
import { addFood, listFood } from "../controllers/foodController.js";
import multer from "multer";

// Create Express Router
const foodRouter = express.Router();

// Image Stroage Engine using the multer diskStorage method
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes:
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);

export default foodRouter;
