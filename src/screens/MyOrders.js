import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../context/ShopContext";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./MyOrder.module.css";

const MyOrders = () => {
  const { shopInstance } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await shopInstance.getAllOrders();
      //console.log(data);
      setOrders(data);
    };
    getOrders();
  }, [setOrders]);

  return (
    <div>
      <h2>All Orders</h2>
      <div>
        {orders.map((order) => (
          <div key={order._id} className="card rounded mb-4 ml-2">
            <div className="card-body">
              <Row>{`Name: ${order.delieveryName}`}</Row>
              <Row>{`Product Name: ${order.name}`}</Row>
              <Row>
                <Col md={6}>
                  <Image
                    src={order.image}
                    alt={order.name}
                    className={styles.imageResize}
                  />
                </Col>
              </Row>
              <Row>{`Brand: ${order.brand}`}</Row>
              <Row>{`Total Cart Value: Rs.${order.totalPrice}`}</Row>
              <Row>{`Delivery address: ${order.address}`}</Row>
              <Row>{`Phone Number: ${order.phone}`}</Row>
              <Row>{`City: ${order.city}`}</Row>
              <Row>{`Zip-Code: ${order.zipcode}`}</Row>
              <Row>{`Shipping Fee: ${order.shippingPrice}`}</Row>
              <Row>{`Is Delivered? ${
                order.isDelivered === false ? "No" : "Yes"
              }`}</Row>
              <Row>{`Order ID: ${order._id}`}</Row>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
