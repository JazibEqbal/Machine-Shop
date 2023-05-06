import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import ProductStructure from "../components/ProductStructure";
import ShopContext from "../context/ShopContext";
import Loading from "../components/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { shopInstance } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(true);

  const setLoaderTiming = () => {
    setTimeout(() => {
      setIsLoading(!isLoading)
    }, 300);
  };
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await shopInstance.getallProducts();
      setProducts(res.data);
      setLoaderTiming();
    };
    getAllProducts();
  }, [setProducts]);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Row>
          {products.map((prod) => (
            <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
              <ProductStructure prod={prod} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;
