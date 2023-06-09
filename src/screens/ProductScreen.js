import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import ShopContext from "../context/ShopContext";
import Loading from "../components/Loading";
import styles from "./ProductScreen.module.css";

const ProductScreen = () => {
  const { shopInstance } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const setLoaderTiming = () => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 150);
  };

  useEffect(() => {
    const getProductById = async () => {
      const { data } = await shopInstance.getAProductById(id);
      setProduct(data);
      setLoaderTiming();
    };
    getProductById();
  }, [setProduct]);

  const submitHandler = async (e) => {
    if (shopInstance.getToken()) {
      delete product._id;
     const res= await shopInstance.saveToCart(product, parseInt(quantity), id);
     console.log(res)
      navigate(`/cart/${id}?qty=${quantity}`);
    } else {
      navigate("/user/signup");
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Rs.{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (quant) => (
                                <option key={quant + 1} value={quant + 1}>
                                  {quant + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroupItem>
                    <Button
                      className={`btn-block ${styles.addToCartButton}`}
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={submitHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
