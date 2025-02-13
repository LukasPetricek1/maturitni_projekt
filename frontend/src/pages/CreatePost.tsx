import React, { FormEvent, useState } from "react";
import MediaUploadSection from "../components/MediaUploadSection";
import axiosInstance from "../axios/instance";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";

const CreatePost: React.FC = () => {
  const navigate = useNavigate()
  const [postInfo , setPostInfo] = useState({ 
    name : "" ,
    description : ""
  })
  const [toast, setToast] = useState({ 
    message : "",
    type : ""
  })
  const [mediaFile, setMediaFile] = useState<File>();
  const user_id = useSelector<RootState>(state => state.auth.userInfo?.id)

  const close = () => {
    setToast({ message :"" , type :""})
  }

  const publish = async (event : FormEvent) => {
    event.preventDefault()
    if (mediaFile && postInfo.description && postInfo.name && user_id) {
        const formData = new FormData();
        formData.append("image", mediaFile);
        formData.append("description" , postInfo.description)
        formData.append("name" , postInfo.name)

        try{
          const response = await axiosInstance.post(`/upload/image?location=posts&type=post&user_id=${user_id}`, formData);
         
          const { fileURL , extension } = response.data

          await axiosInstance.post("/posts/create?user_id=" + user_id, { description : postInfo.description , name : postInfo.name, fileURL , extension});

          setToast({
            message : "Příspěvek byl úspěšně vytvořen",
            type: "success"
          })
          setTimeout(() => { 
            navigate("/")
          } , 2000)
        }catch(err){ 
          console.log(err)
        }
        
    } else {
      if(!mediaFile){
        setToast({ 
          message : "Musíte přidat obrázek nebo video.",
          type : "warning"
        })
      }
      else if(!postInfo.name){ 
        setToast({ 
          message : "Musíte přidat název příspěvku.",
          type: "warning"
        })
      }
      else if(!postInfo.description){
        setToast({ 
          message : "Musíte přidat popisek k příspěvku.",
          type : "warning"
        })
      }
    }
  };

  return (
    <>
    <form onSubmit={publish} encType="multipart/form-data" className="relative h-full w-full flex flex-col items-center  p-4">

    {toast.message && toast.type && <Toast message={toast.message} type={toast.type} onClose={close} />}

      <header className="w-full flex justify-center items-center h-16 bg-purple-800/80 rounded-lg">
        <input
          type="text"
          placeholder="Název příspěvku ..."
          className="w-full text-white text-center text-lg font-medium bg-transparent outline-none"
          value={postInfo.name}
          onChange={e => setPostInfo(prev => ({ ...prev , name : e.target.value}))}
        />
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center gap-6 mt-4">
        <MediaUploadSection
          mediaFile={mediaFile}
          setMediaFile={setMediaFile}
        />

        <textarea
          className="relative w-1/2 max-h-56 resize-y border border-gray-400 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Popisek ..."
          value={postInfo.description}
          onChange={e => setPostInfo(prev => ({ ...prev , description : e.target.value}))}
        />
      </main>

      <footer className="w-full flex justify-end items-center gap-4 px-4 pb-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          onClick={() => alert("Příspěvek zahozen!")}
          type="button"
        >
          <span role="img" aria-label="delete">
            🗑️
          </span>
          Zahodit
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <span role="img" aria-label="publish">
            🚀
          </span>
          Publikovat
        </button>
      </footer>
    </form>
  </>
  );
};

export default CreatePost;
