import React from "react";
import "./ListSkeletonLoader.css";

const ListSkeletonLoader = () => {
  return (
    <div className="list-table">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="list-table-format list-skeleton">
          <div className="list-skeleton-image"></div>
          <div className="list-skeleton-text list-skeleton-name-rating"></div>
          <div className="list-skeleton-text list-skeleton-desc"></div>
          <div className="list-skeleton-text list-skeleton-price"></div>
          <div className="list-skeleton-text list-skeleton-action"></div>
        </div>
      ))}
    </div>
  );
};

export default ListSkeletonLoader;
