import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <a href="/">
          <h2 className="logo">MernEats.com</h2>
          <span className="admin">Admin Panel</span>
        </a>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
