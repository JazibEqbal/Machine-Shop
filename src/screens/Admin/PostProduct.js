import React, { useContext, useState } from "react";
import ShopContext from "../../context/ShopContext";

const PostProduct = () => {
  const { shopInstance } = useContext(ShopContext);
  const [userInput, setUserInput] = useState({
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    rating: "",
    numReviews: "",
  });

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const changeInputHandler = async (e) => {
    if (e.target.name === "image") {
      const image = await toBase64(e.target.files[0]);
      setUserInput((prevState) => {
        return { ...prevState, [e.target.name]: image };
      });
    } else {
      userInput[e.target.name] = e.target.value;
      setUserInput((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await shopInstance.postProductAdmin(userInput);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={`form-group col`}>
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Product Name
          </label>
          <div className="col-sm-10">
            <input
              type="name"
              id="inputName"
              name="name"
              className="form-control"
              required
              placeholder="Enter Product Name"
              value={userInput.name}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputImage" className="col-sm-2 col-form-label">
            Image
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              id="inputImage"
              name="image"
              className="form-control"
              required
              placeholder="Upload image or provide url https://example.com"
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputDescription" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="description"
              id="inputDescription"
              name="description"
              className="form-control"
              required
              placeholder="Enter Product Description"
              value={userInput.description}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputBrand" className="col-sm-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-10">
            <input
              type="brand"
              id="inputBrand"
              name="brand"
              className="form-control"
              required
              placeholder="Enter Brand"
              value={userInput.brand}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputCategory" className="col-sm-2 col-form-label">
            Category
          </label>
          <div className="col-sm-10">
            <input
              type="category"
              id="inputCategory"
              name="category"
              className="form-control"
              required
              placeholder="Enter Category"
              value={userInput.category}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputPrice" className="col-sm-2 col-form-label">
            Price
          </label>
          <div className="col-sm-10">
            <input
              type="price"
              id="inputPrice"
              name="price"
              className="form-control"
              required
              placeholder="Enter Price in rupeess"
              value={userInput.price}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputQuantity" className="col-sm-2 col-form-label">
            Stock Quantity
          </label>
          <div className="col-sm-10">
            <input
              type="countInStock"
              id="inputQuantity"
              name="countInStock"
              className="form-control"
              required
              placeholder="Enter Quantity"
              value={userInput.countInStock}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputnumRating" className="col-sm-2 col-form-label">
            Rating
          </label>
          <div className="col-sm-10">
            <input
              type="rating"
              id="inputnumRating"
              name="rating"
              className="form-control"
              required
              placeholder="Rating 0-5"
              value={userInput.rating}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className={`form-group col`}>
          <label htmlFor="inputnumReviews" className="col-sm-2 col-form-label">
            Reviews
          </label>
          <div className="col-sm-10">
            <input
              type="numReviews"
              id="inputnumReviews"
              name="numReviews"
              className="form-control"
              required
              placeholder="Enter number of reviews"
              value={userInput.numReviews}
              onChange={changeInputHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className={`btn btn-dark mt-4`}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostProduct;
