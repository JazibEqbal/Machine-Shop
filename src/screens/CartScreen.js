import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { Alert, Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import styles from "./CartScreen.module.css";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const { shopInstance } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const setLoaderTiming = () => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 150);
  };
  // const qtyParams = new URLSearchParams(window.location.search).get("qty");
  useEffect(() => {
    const getCartProduct = async () => {
      const { data } = await shopInstance.getCart();
      // console.log(data);
      if (data) {
        setProduct(data);
      }
      setLoaderTiming();
    };
    getCartProduct();
  }, [setProduct]);

  const removeProductHandler = async (id) => {
    await shopInstance.removeFromCart(id);
    setTimeout(() => {
      window.location.reload(false);
    }, 50);
  };
  const addOneProductHandler = async (id) => {
    await shopInstance.addOne(id);
    setTimeout(() => {
      window.location.reload(false);
    }, 50);
  };
  return (
    <Row>
      {isLoading ? (
        <Loading />
      ) : (
        <Col md={8}>
          <h2>Shopping Cart</h2>
          {product.length === 0 ? (
            <Alert className="text-black p-2 text-uppercase w-auto text-center bg-[rgb(52,58,54)]">
              OOPs!! Your Cart is Empty
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {product.map((prod) => (
                <ListGroup.Item key={prod._id}>
                  <Row>
                    <Row>{prod.name}</Row>
                    <Row>{prod.brand}</Row>
                    <Row className={styles.priceBold}>{`Rs.${prod.price}`}</Row>
                    <Link to={`/product/${prod._id}`}>
                      <Col md={6}>
                        <Image src={prod.image} alt="img" fluid rounded />
                      </Col>
                    </Link>
                    <Row md={6}>
                      <Button
                        type="button"
                        onClick={() => {
                          removeProductHandler(prod._id);
                        }}
                        className={styles.buttonHover}
                      >
                        -1
                      </Button>
                    </Row>
                    <Col md={4}>{`Quantity: ${prod.quantity}`}</Col>
                    <Row md={6}>
                      <Button
                        type="button"
                        onClick={() => {
                          addOneProductHandler(prod._id);
                        }}
                        disabled={prod.quantity === prod.countInStock}
                        className={styles.buttonHover}
                      >
                        {prod.quantity < prod.countInStock
                          ? "+"
                          : "Out of stock"}
                      </Button>
                    </Row>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
