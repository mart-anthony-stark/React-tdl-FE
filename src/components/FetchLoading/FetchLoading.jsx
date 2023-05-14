import React from "react";
import "./FetchLoading.css";

const FetchLoading = ({ text }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default FetchLoading;
