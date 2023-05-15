import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ShopInstance from "./lib/api";
import { ShopInstanceProvider } from "./context/ShopContext";
import CartScreen from "./screens/CartScreen";
import LogInSignUp from "./screens/LogInSignUp";
import Shipping from "./screens/Shipping";
import Payment from "./screens/Payment";
import MyOrders from "./screens/MyOrders";
import Dashboard from "./screens/Admin/Dashboard";
import PostProduct from "./screens/Admin/PostProduct";
import Users from "./screens/Admin/Users";
import AllOrdersByAUser from "./screens/Admin/AllOrdersByAUser";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const shopInstance = new ShopInstance(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    const getAdmin = async () => {
      const res = await shopInstance.getAdminHandler();
      if (res.status === 200) {
        setIsAdmin(!isAdmin);
        setIsLoggedIn(!isLoggedIn);
      }
    };
    getAdmin();
  }, [setIsAdmin]);
  return (
    <ShopInstanceProvider value={{ shopInstance }}>
      <Router>
        <div>
          <Header isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/user/my/orders" element={<MyOrders />} exact />
                {isAdmin && <Route path="/admin/get/all/orders/:id" element={<AllOrdersByAUser />} exact />} 
                {isAdmin && <Route path="/admin/get/all/users" element={<Users />} exact />}
                {isAdmin && <Route path="/admin/post/product" element={<PostProduct />} exact />}
                {isAdmin && <Route path="/admin" element={<Dashboard />} exact />}
                <Route path="/order/payment" element={<Payment />} exact />
                <Route path="/shipping/?" element={<Shipping />} exact />
                <Route path="/user/signup" element={<LogInSignUp />} exact />
                <Route path="/cart/:id?" element={<CartScreen />} exact />
                <Route path="/product/:id" element={<ProductScreen />} exact />
                <Route path="/" element={<Home />} exact />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </Router>
    </ShopInstanceProvider>
  );
};

export default App;
