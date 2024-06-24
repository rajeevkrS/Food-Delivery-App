import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, url, food_list } =
    useContext(StoreContext);

  // Creating a state var for the form field
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [copyButtonText, setCopyButtonText] = useState("Copy");

  // Handler to save the from data in the data state var.
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Redirecting to payment getway page
  const handlePayment = async (e) => {
    e.preventDefault();

    // Creating order's data as created in the API
    let orderItems = [];

    food_list.map((item) => {
      // Sending the item's info. like quantity
      if (cartItems[item._id] > 0) {
        let itemInfo = item;

        // sending the total cart item's quantity to itemInfo property.
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Stored address, items & amount in the order data var.
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Now sending this orderData from our API
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;

      // The window.location object represents the current location of the document.
      // send the user on session url
      window.location.replace(session_url);
    } else {
      console.log(alert("Error"));
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      alert("Login to checkout! ");
    } else if (getTotalCartAmount() === 0) {
      navigate("/");
      alert("Cart is empty! ");
    }
  }, [token]);

  const copyToClipboard = () => {
    const textToCopy = "4000003560000008";
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopyButtonText("Copied");
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <form onSubmit={handlePayment} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>

          <div className="card-no-container">
            <h2>Card No:</h2>
            <h2>4000003560000008</h2>
            <button
              className="copy-clipboard"
              type="button"
              onClick={copyToClipboard}
            >
              {copyButtonText}
            </button>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
