import React from "react";
import "./Loading.css"; // import CSS file for loading animation styles

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
      <div className="loading-circle"></div>
      <div className="loading-circle"></div>
    </div>
  );
};

export default LoadingScreen;
