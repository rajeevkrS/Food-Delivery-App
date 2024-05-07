import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// creating a token to send that token using the response to the user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User API
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // check user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email!" });
    }

    // check the password length greater than 6
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    // encrypting the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // After all checks, creating a new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // After creating new user, saving the new user in the DB
    const user = await newUser.save();

    // Taking the user's id and generating a token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists with the entered email id
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists!" });
    }

    // if entered email matched, then comparing using password from DB password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    // if the password matches, then generating a token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
