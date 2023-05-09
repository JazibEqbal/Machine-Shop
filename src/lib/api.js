import axios from "axios";

class ShopInstance {
  constructor(host) {
    this.host = host;
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }
  removeToken() {
    localStorage.removeItem("token");
  }
  getToken() {
    return localStorage.getItem("token");
  }

  async signUpHandler(data) {
    try {
      const options = {
        method: "POST",
        url: `${this.host}/user/register`,
        data: {
          ...data,
        },
      };
      const res = await axios(options);
      if (res.status === 201) {
        this.setToken(res.data.token);
      }
      return res;
    } catch (error) {
      console.log("dd");
      return error;
    }
  }

  async logInHandler(data) {
    try {
      const options = {
        method: "POST",
        url: `${this.host}/user/login`,
        data: {
          ...data,
        },
      };
      const res = await axios(options);
      if (res.status === 201) {
        this.setToken(res.data.token);
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async getAProductById(id) {
    try {
      const options = {
        method: "GET",
        url: `${this.host}/products/${id}`,
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
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
        url: `${this.host}/products`,
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
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
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
        data: {
          ...data,
          productId: id,
          quantity,
        },
      };
      const response = await axios(options);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getCart() {
    try {
      const options = {
        method: "GET",
        url: `${this.host}/cart/get`,
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
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
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
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

  async addOne(id) {
    try {
      const options = {
        method: "POST",
        url: `${this.host}/cart/add-one`,
        headers: {
          Authorization: `JWT ${this.getToken()}`,
        },
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
