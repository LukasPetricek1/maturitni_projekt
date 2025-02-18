import React, { useState , useContext } from "react";
import { AppContext } from "../Context/AppContext";

import ArticleEditor from "../components/editor/ArticleEditor";
import axiosInstance from "../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { useNavigate } from "react-router-dom";

const CreateArticle: React.FC = () => {
  const navigate = useNavigate()
  const { setToastInfo , toastMessage } = useContext(AppContext)
  const user_id = useSelector<RootState>(state => state.auth.userInfo?.id)
  const [metaData, setMetaData] = useState({
    title: "",
    subtitle: ""
  });

  const handleMetaData = (name : string, value : string) => { 
    if(value.length > 50){ 
      const subject = name === "title" ? "Nadpis" : "Podnadpis"
      if(!toastMessage) setToastInfo(`${subject} nesmí být delší než 50.` , "warning")
    }else{ 
      setMetaData(prev => ({ 
        
        ...prev,
        [name] : value
      }))
    }
  }

  const publish = async (content : string , text : string) => { 
    if(metaData.title && metaData.subtitle && user_id && text){ 
      try{ 
        const regExp = /src="(blob:([\w,/,:,-]+))/g;
        const  images = [...content!.matchAll(regExp)];
        if (images) {
          for (let i = 0; i < images.length; i++) {
            const blobURL = images[i][1]

            const first = await fetch(blobURL)
            const blob = await first.blob()
    
            const formData = new FormData()
            formData.append("image" , new File([blob] , "image.png" , { type : blob.type} ))

            const {data} = await axiosInstance.post(`/upload/image?location=articles&user_id=${user_id}&type=article`, formData)
            const new_url = data.fileURL

            content = content.replace(blobURL , new_url)
          }
        }

        await axiosInstance.post("/articles/create" , { 
          user_id, 
          content,
          title : metaData.title,
          subtitle : metaData.subtitle,
          security : "public"
      })

        setToastInfo("Článek byl úspěšně publikován" , "warning")
        setTimeout(() => { 
          navigate("/?view=články")
        }, 1500 )
      }catch(err){ 
        console.log(err)
      }
    }else{ 
      if(!metaData.title && !toastMessage) setToastInfo(`Článek musí mít nadpis.` , "warning")
      else if(!metaData.subtitle && !toastMessage) setToastInfo(`Článek musí mít podnadpis.` , "warning")
      else if(!text && !toastMessage) setToastInfo(`Článek je nic bez obsahu.` , "warning")
    }
  }

  return (
    <section className="flex flex-col items-center w-full h-full p-5">
      <section className="flex flex-col items-center justify-center w-full gap-5">
        <input
          className="w-full text-3xl text-center text-purple-500 bg-transparent outline-none "
          type="text"
          placeholder="Nadpis ..."
          value={metaData.title}
          onChange={e => handleMetaData("title" , e.target.value)}
        />
        <input
          className="w-full text-center text-purple-500 bg-transparent outline-none "
          type="text"
          placeholder="Podnapis ..."
          value={metaData.subtitle}
          onChange={e => handleMetaData("subtitle" , e.target.value)}
        />
      </section>

      <ArticleEditor onPublish={(contentHTML : string , contentText) => publish(contentHTML, contentText)} />
    </section>
  );
};

export default CreateArticle;
