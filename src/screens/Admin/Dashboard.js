import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="card rounded mb-4">
        <div className="card-body">
          <h5 className="card-title">Post A Product</h5>
          <p className="card-text">Upload a new product</p>
          <a href="/admin/post/product" className="btn btn-dark">
            Select
          </a>
        </div>
      </div>
      <div className="card lg:w-50 sm:w-100 rounded mb-4">
        <div className="card-body">
          <h5 className="card-title">Users</h5>
          <p className="card-text">Get all users</p>
          <a href="/admin/get/all/users" className="btn btn-dark">
            Select
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
