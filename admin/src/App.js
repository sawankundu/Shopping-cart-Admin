import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import ProductManagementPage from "./components/admin/ProductManagementPage";
import Home from "./components/admin/Home/Home";
import ProductForm from "./components/admin/AddProduct/ProductForm";
import Login from "./components/admin/SignIn/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/users" element={<Home />} />
        <Route path="/products" element={<ProductManagementPage />} />
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
