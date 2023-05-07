import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Loading from "../components/Loading";

const CartScreen = () => {
  const { shopInstance } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { id } = useParams();

  const setLoaderTiming = () => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 150);
  };
  // const qtyParams = new URLSearchParams(window.location.search).get("qty");
  useEffect(() => {
    const getCartProduct = async () => {
      const { data } = await shopInstance.getCart();
      setProduct(data);
      setLoaderTiming();
    };
    getCartProduct();
  }, [setProduct, id, shopInstance]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {product.length === 0 ? (
            <Alert className="text-white p-2 text-uppercase col-3 text-center bg-danger">OOPs!! Your Cart is Empty</Alert>
          ) : (
            <div>
              {product.map((prod) => (
                <div key={prod._id}>
                  <h2>{prod.name}</h2>
                  <img src={prod.image} alt="img" />
                  <h2>{prod.brand}</h2>
                  <h2>{prod.price}</h2>
                  <h2>{prod.quantity}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartScreen;
