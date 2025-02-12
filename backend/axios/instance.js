const axios = require("axios")

const axiosInstance  = axios.create({ 
  baseURL : process.env.BACKEND_URL,
  withCredentials : true
})

module.exports = axiosInstance;