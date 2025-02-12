import React , { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/instance";
import { updateProfilePicture, updateThemePicture } from "../redux-store/auth";

import Placeholder from "../assets/placeholder.webp"

interface ImageComponentProps {
  src: string;
  For: "profile-picture" | "theme-picture";
  user_id : number;
  disabled : boolean
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, For, user_id , disabled }) => {
  const dispatch = useDispatch()
  const { setToastInfo } = useContext(AppContext)

    const uploadImage = (location : "profile_pictures" | "theme_images" , type : "profile-picture" | "theme-picture") => { 
      const imageInput = document.createElement("input")
      imageInput.type = "file"
      imageInput.accept = "image/*"
  
      imageInput.onchange = function(event : Event){ 
        const target = event.target as HTMLInputElement;
        if(target.files){ 
          const newImage = target.files[0]
          const formData = new FormData()
          formData.append("image" , newImage)
  
          axiosInstance.post(`/upload/image?location=${location}&type=${type}&user_id=${user_id}` , formData)
            .then(({data}) => {
              if(type==="profile-picture"){
                dispatch(updateProfilePicture(data.imageURL))
              }
              else if(type==="theme-picture"){
                dispatch(updateThemePicture(data.imageURL))
              }
              setToastInfo("Úspěšně jste si nahr8li fotku" , "success")
            })
            .catch(err => {
              console.log(err)
              setToastInfo("Při nahrávání fotky došlo k chybě. Zkuste to prosím později." , "error")
            })
          
        }
      }

      imageInput.click()
    }

  if (For === "profile-picture") {
    return (
      <img
        onClick={() => !disabled && uploadImage("profile_pictures" , "profile-picture")}
        src={src || Placeholder}
        alt="profile picture"
        className={`w-44 aspect-square object-cover rounded-full object-center justify-self-center m-5 border border-purple-500 ${!disabled && "hover:opacity-80"} transition`}
      />
    );
  } else if (For === "theme-picture") {
    return (
      <img
      onClick={() => !disabled && uploadImage("theme_images" , "theme-picture")}
        src={src || Placeholder}
        alt="theme picture"
        className={`w-1/2 aspect-video object-cover object-center justify-self-center m-5 border border-purple-500 ${!disabled && "hover:opacity-80"} transition`}
      />
    );
  }

  return <></>
};

export default ImageComponent;
