import axios from 'axios'

class Api {
  constructor(token) {
    this.serverUrl = process.env.NODE_ENV === 'production' ? 'deploy-server' : 'http://localhost:8080'
    this.token = token
  }

  headers() {
    if (this.token === undefined) {
      return {
        'Content-Type': 'application/json'
      }
    } 
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    }
  }

  axiosPostOpt(path, requestBody) {
    const opt = {
      method: 'post',
      url: `${this.serverUrl}/${path}`,
      data: requestBody,
      headers: this.headers()
    }
    return opt
  }

  axiosGetOpt(path) {
    return {
      method: 'get',
      url: `${this.serverUrl}/${path}`,
      headers: this.headers()
    }
  }

  axiosPutOpt(path) {
    return {
      method: 'put',
      url: `${this.serverUrl}/${path}`,
      headers: this.headers()
    }
  }

  // POST
  async login(requestBody) {
    const path = 'account/login'
    return axios(this.axiosPostOpt(path, requestBody))
  }

  async register(requestBody) {
    const path = 'account/register'
    return axios(this.axiosPostOpt(path, requestBody))
  }

  async placeOrder(requestbody) {
    const path = 'order/place_order'
    return axios(this.axiosPostOpt(path, requestbody))
  }

  // GET
  async getCenters() {
    const path = 'dispatch_center'
    return axios(this.axiosGetOpt(path))
  }

  async getOrderDetails(orderId) {
    const path = `order/get_order_detail/${orderId}`
    return axios(this.axiosGetOpt(path))
  }

  async getAllOrders(userId) {
    const path = `order/get_orders/${userId}`
    return axios(this.axiosGetOpt(path))
  }

  async getAccountInfo(userId) {
    const path = `account/get_info/${userId}`
    return axios(this.axiosGetOpt(path))
  }

  // PUT
  async cancelOrder(orderId) {
    const path = `order/update_order/${orderId}?status=3`
    return axios(this.axiosPutOpt(path))
  }
}

export default Api