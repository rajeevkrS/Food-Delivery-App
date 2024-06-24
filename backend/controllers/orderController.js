import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Stripe package for payments
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order for frontend
const placeOrder = async (req, res) => {
  // const frontend_url = "http://localhost:5174";
  const frontend_url = process.env.FRONTEND_URL;

  try {
    // Creating a New Order from orderModel
    const newOrder = new orderModel({
      userId: req.body.userId, //userId will be received from Auth-M.
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Saving the received order in the DB
    await newOrder.save();

    // When order gets placed then clearing the user's cart.
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Logic to create the payment link using the Stripe
    // => Line Items will consists of items data like name, currency etc
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        // converting amount from $ to ₹.
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    // Pushing the delivey charges in the Line Items
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // Using this Line Items, creating 1 session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",

      //if payment is successful then user will be redirected to success page after the payment.
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

      //if payment is unsuccessful then user will be redirected to cancel page.
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // sent the session url as a response.
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error!",
    });
  }
};

// When payment is success/cancel then verifying the order payment
const verifyOrder = async (req, res) => {
  // fetching the orderId and success from req.body
  const { orderId, success } = req.body;

  try {
    // Payment Successful
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid!" });
    }
    // Payment Canceled then deleting the order from DB
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// User's order API for frontend
const userOrders = async (req, res) => {
  try {
    // Find all order of particular user
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// Listing orders for admin panel
// API to fetch all the orders details of all users.
const listOrders = async (req, res) => {
  try {
    // accessing all the order's data in the orders var
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    // Finding the order using Id, then updating the status value
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
