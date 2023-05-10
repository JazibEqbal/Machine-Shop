import React, { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import styles from "./LogInSignUp.module.css";
import { useNavigate } from "react-router-dom";

const LogInSignUp = () => {
  const { shopInstance } = useContext(ShopContext);
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    userInput[e.target.name] = e.target.value;
    setUserInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const toggle = () => {
    setIsMember(!isMember);
  };

  const logInSubmitHandler = async (e) => {
    e.preventDefault();
    let res;
    if (isMember) {
      res = await shopInstance.logInHandler({
        email: userInput.email,
        password: userInput.password,
      });
    } else {
      res = await shopInstance.signUpHandler({ ...userInput });
    }
    if (res.status === 201) {
      shopInstance.setToken(res.data.token);
      navigate("/");
      window.location.reload(false);
    }
    return res;
  };
  return (
    <div>
      <form onSubmit={logInSubmitHandler}>
        <div>
          {!isMember && (
            <div className={`${styles.maxWidthInput} form-group col`}>
              <label htmlFor="inputName" className="col-sm-2 col-form-label">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  type="name"
                  id="inputName"
                  name="name"
                  required
                  className="form-control"
                  placeholder="Enter Name"
                  value={userInput.name}
                  onChange={changeInputHandler}
                />
              </div>
            </div>
          )}
        </div>
        <div className={`${styles.maxWidthInput} form-group col`}>
          <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              id="inputEmail"
              name="email"
              className="form-control"
              required
              placeholder="Enter Email"
              value={userInput.email}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`${styles.maxWidthInput} form-group col`}>
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              name="password"
              id="inputPassword"
              required
              className="form-control"
              placeholder="Enter Password"
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className={`${styles.buttonLogin} btn btn-dark`}
            >
              {isMember ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </form>
      <div>
        <p className={styles.memberToggle}>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            className={styles.buttonToggle}
            onClick={toggle}
          >
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LogInSignUp;
