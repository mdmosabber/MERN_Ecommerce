import React from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Form from './pages/Form.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './components/dashboard/MasterDashboard.jsx';
import UserDashboard from './components/dashboard/UserDashboard.jsx';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import ProductForm from "./components/dashboard/ProductForm.jsx";
import AdminProductUpdate from "./components/dashboard/ProductUpdate.jsx";
import AdminProducts from "./components/dashboard/AdminProducts.jsx";




function App() {

  return (
    <div className="App">
        <BrowserRouter>
        <Toaster/>       
            <Routes> 
                <Route path="/login" element={< Form />} />           
                <Route path="/register" element={< Register />} />       
                

                <Route path="/" element={<Home />} /> 
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />                
                <Route path="dashboard/user" element={<UserDashboard />} />
                <Route path="/checkout" element={<Checkout />} />  


                <Route path="/dashboard/admin" element={<Dashboard />} />  
                <Route path="/admin/productCreate" element={<ProductForm />} />                        
                <Route path="/admin/products" element={<AdminProducts />} />  
                <Route path="/admin/product/update/:id" element={<AdminProductUpdate />} />  
                
                                 
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
