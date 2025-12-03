import React, { useContext, useState, useEffect } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [trackingId, setTrackingId] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  const handleTrackOrder = async (orderId) => {
    setTrackingId(orderId);
    await fetchOrders();
    setTrackingId(null);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />

            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>

            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>

            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>

            <button
              onClick={() => handleTrackOrder(order._id)}
              disabled={trackingId === order._id}
            >
              {trackingId === order._id ? "Tracking..." : "Track Order"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
