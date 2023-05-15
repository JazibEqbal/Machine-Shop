import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/ShopContext";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Users = () => {
  const { shopInstance } = useContext(ShopContext);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await shopInstance.getAllUserAdmin();
      //console.log(data);
      setAllUser(data);
    };
    getAllUsers();
  }, [setAllUser]);

  return (
    <div>
      <h2>All Users</h2>
      <div>
        {allUser.map((user) => (
          <div key={user._id} className="card rounded">
            <div className="card-body">
              <Row>
                User ID:
                <Col>{user._id}</Col>
              </Row>
              <Row>{`User Name: ${user.name}`}</Row>
              <Row>{`User Email: ${user.email}`}</Row>
              <Link to={`/admin/get/all/orders/${user._id}`}>
                <button className="btn btn-dark mt-2">
                  Get Orders
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
