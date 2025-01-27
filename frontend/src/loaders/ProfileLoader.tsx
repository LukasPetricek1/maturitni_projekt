import axiosInstance from "../axios/instance"

export default async function profileLoader({ params }){ 
  const { account_id } = params

  const user = await axiosInstance.get(`/users/${account_id}`)
  
  return user.data[0];
}