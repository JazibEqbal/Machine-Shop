import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShopContext from "../../context/ShopContext";
import { Row } from "react-bootstrap";

const AllOrdersByAUser = () => {
  const { shopInstance } = useContext(ShopContext);
  const [allOrder, setAllOrder] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    const allOrders = async () => {
      const { data } = await shopInstance.getAllOrdersAdmin(id);
      //console.log(data);
      if (data) {
        setAllOrder(data);
      }
    };
    allOrders();
  });
  return (
    <div>
      <h2>All Orders</h2>
      <div>
        {allOrder.map((order) => (
          <div key={order._id} className="card rounded mb-4 ml-2">
            <div className="card-body">
              <Row>{`Name: ${order.delieveryName}`}</Row>
              <Row>{`Product Name: ${order.name}`}</Row>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrdersByAUser;
