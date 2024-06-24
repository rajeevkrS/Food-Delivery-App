import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="food-item skeleton">
      <div className="food-item-img-container">
        <div className="skeleton-image"></div>
      </div>
      <div className="food-item-info">
        <div className="skeleton-text skeleton-name-rating"></div>
        <div className="skeleton-text skeleton-desc"></div>
        <div className="skeleton-text skeleton-price"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
