import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    // Finding the user
    // req.body.userId is getting from auth middleware
    // So while requesting we will not send the userId, we will send the token and auth middleware will convert the token in the userId
    let userData = await userModel.findById(req.body.userId);

    // Storing the user's cart data in cart data variable.
    let cartData = await userData.cartData;

    // So when user will have to add the data in the cart then they will send the token with item id.
    if (!cartData[req.body.itemId]) {
      // if there is no item in the cart then creating 1 item.
      cartData[req.body.itemId] = 1;
    } else {
      // if item is already present then increasing the item by 1
      cartData[req.body.itemId] += 1;
    }

    // when item gets added in the cart then updating the user's cart with new cart data.
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export { addToCart, removeFromCart, getCart };
