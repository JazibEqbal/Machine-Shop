import React from "react";
import { Card } from "react-bootstrap";
import Rating from './Rating';
import { Link } from "react-router-dom";

const Product = ({ prod }) => {
  return (
    <Card className="my-3 p-3 rounded minCardHeight">
      <Link to={`/product/${prod._id}`}>
        <Card.Img src={prod.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${prod._id}`}>
          <Card.Title as="div">
            <strong>{prod.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
            <Rating 
              value={prod.rating}
              text={`${prod.numReviews} reviews`}
            />
        </Card.Text>
        <Card.Text as="h3">Rs.{prod.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
