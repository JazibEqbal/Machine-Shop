import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ShopInstance from "./lib/api";
import { ShopInstanceProvider } from "./context/ShopContext";
import CartScreen from "./screens/CartScreen";

const App = () => {
  const shopInstance = new ShopInstance(process.env.REACT_APP_BACKEND_URL);
  return (
    <ShopInstanceProvider value={{ shopInstance }}>
      <Router>
        <div>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
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
