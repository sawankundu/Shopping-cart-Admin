import React, { useState } from "react";
import FormInput from "../FormInput";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ProductForm from "./AddProduct/ProductForm";
import ProductList from "./GetAllProduct/ProductList ";
import "./ProductManagementPage.css";

const ProductManagementPage = () => {
  return (
    <>
      <Link to="/product/add" className="pro-add">
        <h4>Add Product</h4>
      </Link>
      <div className="product-list">
        <ProductList />
      </div>
    </>
  );
};

export default ProductManagementPage;
