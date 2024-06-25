import React from "react";
import "./OrderSkeletonLoader.css";

const OrderSkeletonLoader = () => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div className="food-item skeleton" key={index}>
          <div className="food-item-img-container">
            <div className="skeleton-image"></div>
          </div>
          <div className="food-item-info">
            <div className="skeleton-text skeleton-name-rating"></div>
            <div className="skeleton-text skeleton-desc"></div>
            <div className="skeleton-text skeleton-price"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeletonLoader;
