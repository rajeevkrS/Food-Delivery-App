import React from "react";
import "./ListSkeletonLoader.css";

const ListSkeletonLoader = () => {
  return (
    <div className="list-table">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="list-table-format skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-text skeleton-name-rating"></div>
          <div className="skeleton-text skeleton-desc"></div>
          <div className="skeleton-text skeleton-price"></div>
          <div className="skeleton-text skeleton-action"></div>
        </div>
      ))}
    </div>
  );
};

export default ListSkeletonLoader;
