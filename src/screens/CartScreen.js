import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { Alert, Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Loading from "../components/Loading";
import styles from "./CartScreen.module.css";
import { Link, useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { shopInstance } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const setLoaderTiming = () => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 150);
  };

  useEffect(() => {
    const getCartProduct = async () => {
      const { data } = await shopInstance.getCart();
      if (data) {
        const newData = data.filter((item) => !item.isOrdered);
        setTotal(
          newData.reduce((accumulator, object) => {
            return accumulator + object.price * object.quantity;
          }, 0)
        );
        setProduct(newData);
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
  const checkOutButton = () => {
    navigate(`/shipping/?total%amount=${total.toFixed(2)}`);
  };
  return (
    <Row>
      {isLoading ? (
        <Loading />
      ) : (
        <Col md={8}>
          <h2>Shopping Cart</h2>
          {product.length === 0 ? (
            <div>
              <Alert className="text-black p-2 text-uppercase w-auto text-center bg-[rgb(52,58,54)]">
                OOPs!! Your Cart is Empty
              </Alert>
              <div>
                {!shopInstance.getToken() && (
                  <Link to="/user/signup">
                    <button type="button" className="btn btn-dark">
                      Log in to view your cart items
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              <ListGroup variant="flush">
                {product.map((prod) => (
                  <ListGroup.Item key={prod._id}>
                    <Row>
                      <Row>{prod.name}</Row>
                      <Row>{prod.brand}</Row>
                      <Row
                        className={styles.priceBold}
                      >{`Rs.${prod.price}`}</Row>
                      <Link to={`/product/${prod._id}`}>
                        <Col md={6}>
                          <Image src={prod.image} alt="img" fluid rounded />
                        </Col>
                      </Link>
                      <div className={styles.increaseDescreaseButtonGroup}>
                        <div className={styles.buttonGroupMargin}>
                          <Button
                            type="button"
                            onClick={() => {
                              removeProductHandler(prod._id);
                            }}
                            className={`${styles.buttonRemove} btn btn-dark`}
                          >
                            -1
                          </Button>
                        </div>
                        <h5 className={styles.quantityCount}>
                          {prod.quantity}
                        </h5>
                        <div className={styles.buttonGroupMargin}>
                          <Button
                            type="button"
                            onClick={() => {
                              addOneProductHandler(prod._id);
                            }}
                            disabled={prod.quantity === prod.countInStock}
                            className={`${styles.buttonAdd} btn btn-dark`}
                          >
                            {prod.quantity < prod.countInStock
                              ? "+"
                              : "Out of stock"}
                          </Button>
                        </div>
                      </div>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <ListGroup>
                <Row className={`${styles.subTotalMargin} fs-1`}>
                  {`CART TOTAL - ${total < 500 ? total + parseInt(40) : total}`}
                </Row>
                {product.map((prod) => (
                  <ListGroup.Item key={prod._id}>
                    <Row className="m-auto p-1">{`${prod.name} X ${
                      prod.quantity
                    } = Rs.${prod.price * prod.quantity}`}</Row>
                  </ListGroup.Item>
                ))}
                <Row className={styles.shippingFee}>{`SHIPPING FEE - ${
                  total > 500 ? "FREE" : "Rs. 40"
                }`}</Row>
                <Row>
                  <Button
                    type="button"
                    className={`${styles.proceedToCheckOutButton} btn btn-dark`}
                    onClick={checkOutButton}
                  >
                    Proceed To Checkout
                  </Button>
                </Row>
              </ListGroup>
            </>
          )}
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
