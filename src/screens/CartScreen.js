import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { Row, Col} from 'react-bootstrap';

const CartScreen = () => {
  const { shopInstance } = useContext(ShopContext);
  const [product, setProduct] = useState([]);
  let { id } = useParams();

  const qtyParams = new URLSearchParams(window.location.search).get("qty");
  useEffect(() => {
    const getCartProductById = async () => {
      const { data } = await shopInstance.getAProductById(id);
      setProduct(data);
    };
    getCartProductById();
  }, [setProduct, id, shopInstance]);

  return <div>
    {/* <Row>
      <Col md={8}>
         <h1>Shopping Cart</h1>
         {items.length === 0 ? <Message></Message>}
      </Col>
      <Col md={2}>
        
        </Col>
        <Col md={2}>
        
        </Col>
    </Row> */}
  </div>;
};

export default CartScreen;
