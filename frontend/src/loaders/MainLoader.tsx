// import { AxiosError } from "axios";
import axiosInstance from "../axios/instance";

export async function loader (){

    const response = await axiosInstance.get("/verify" , {
      withCredentials : true
    })

    if(response.err){ 
      return { err : response.err}
    }else{ 
      const { email , name , username , password } = response.data
      const { website , bio , id} = response.data
    
      return {
        credentials : { email, name , username , password},
        userInfo : { website , bio , hobbies : [], id}
      }
    }
    
}