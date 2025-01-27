import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({ 
  baseURL : "http://localhost:3000",
  timeout : 1000,
  withCredentials : true
})

axiosInstance.interceptors.response.use(function(response){ 
  return response
} , async function(err){ 
  if(err.response && err.response.status === 401){
    throw new Response(JSON.stringify({ message : "Unauthorized" }) , { status : 401} )
  }

  return Promise.reject(err)
})

export default axiosInstance;