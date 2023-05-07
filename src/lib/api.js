import axios from "axios";

class ShopInstance {
  constructor(host) {
    this.host = host;
  }

  // setCart(cartItems) {
  //   localStorage.setItem("CartItems", JSON.stringify(cartItems));
  // }
  // getCart(){
  //   return localStorage.getItem('CartItems');
  // }
  async getAProductById(id) {
    try {
      const options = {
        method: "GET",
        url: `${this.host}/v1/products/${id}`,
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getallProducts() {
    try {
      const options = {
        method: "GET",
        url: `${this.host}/v1/products`,
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      return error;
    }
  }

  async saveToCart(data, quantity, id) {
    try {
      const options = {
        method: "POST",
        url: `${this.host}/cart/save`,
        data: {
          ...data,
          productId: id,
          quantity,
        },
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      console.log("Here");
      return error;
    }
  }

  async getCart() {
    try {
      const options = {
        method: "GET",
        url: `${this.host}/cart/get`,
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      return error;
    }
  }

  async removeFromCart(id) {
    try {
      const options = {
        method: "DELETE",
        url: `${this.host}/cart/remove`,
        data: {
          productId: id,
        },
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default ShopInstance;
