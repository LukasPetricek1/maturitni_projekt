import axiosInstance from "../axios/instance";

export async function postPageLoader({ params }){ 
  const { post_id } = params;

  const response =  await axiosInstance.get(`/posts/${post_id}`)
  
  if(response.data.length === 0){ 
    return { error : 404}
  }else{ 
    return response.data[0]
  }
}