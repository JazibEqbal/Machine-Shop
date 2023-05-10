import React, { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shopInstance } = useContext(ShopContext);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    delieveryName: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
  });
  const totalAmount = new URLSearchParams(window.location.search).get("total%amount");
  // const shippingAmount = new URLSearchParams(window.location.search).get("shipping%amount");
  // console.log(shippingAmount);

  const saveShippingHandler = async (e) => {
    e.preventDefault();
    console.log(userInput);
    await shopInstance.saveShippingDetails(userInput, totalAmount);
    navigate("/order/payment");
  };

  const changeInputHandler = (e) => {
    userInput[e.target.name] = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <h2>Shipping Details</h2>
      <form onSubmit={saveShippingHandler}>
        <div className={`form-group col`}>
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="delieveryName"
              id="inputName"
              name="delieveryName"
              className="form-control"
              required
              placeholder="Enter Full Name"
              value={userInput.delieveryName}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputNumber" className="col-sm-2 col-form-label">
            Phone Number
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              id="inputNumber"
              name="phone"
              className="form-control"
              required
              placeholder="+91"
              value={userInput.phone}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputAddress" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="address"
              id="inputAddress"
              name="address"
              className="form-control"
              required
              placeholder="Enter Complete Address"
              value={userInput.address}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputCity" className="col-sm-2 col-form-label">
            City
          </label>
          <div className="col-sm-10">
            <input
              type="city"
              id="inputCity"
              name="city"
              className="form-control"
              required
              placeholder="Enter City"
              value={userInput.city}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputPinCode" className="col-sm-2 col-form-label">
            Pin Code
          </label>
          <div className="col-sm-10">
            <input
              type="zipcode"
              id="inputPinCode"
              name="zipcode"
              className="form-control"
              required
              placeholder="Enter Pin Code"
              value={userInput.zipcode}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className={`btn btn-dark mt-4`}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
