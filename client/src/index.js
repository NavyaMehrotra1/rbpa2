import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'; 
import ProductivityApp from "./components/ProductivityApp"; // or './components/ProductivityApp' if it's in a subfolder

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductivityApp />
  </React.StrictMode>
);
