import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({ 
  baseURL : "http://localhost:3000",
  withCredentials : true
})

axios.interceptors.request.use(function(config){ 
  console.log(config.baseURL)
  return config
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