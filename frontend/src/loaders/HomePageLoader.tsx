import axiosInstance from "../axios/instance"

export async function homePageLoader(){ 

  const { data } = await axiosInstance.get("/posts" , { 
     params : { 
      user_id : 2
    },
    withCredentials : true
  })
  
  return data
}