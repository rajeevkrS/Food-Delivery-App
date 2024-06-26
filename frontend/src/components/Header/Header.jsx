import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Place your favorite food order here</h2>
        <p>
          Select from a diverse menu offering a delectable selection of dishes,
          made with the finest ingredients and expert culinary skills. Our goal
          is to satisfy your cravings and enhance your dining experience with
          every delicious meal.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
