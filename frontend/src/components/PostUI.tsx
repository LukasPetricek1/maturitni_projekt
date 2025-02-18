import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { postDataProps } from "../data/posts";

import { FiHeart, FiBookmark, FiMessageSquare } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { AppContext } from "../Context/AppContext";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { useSocket } from "../Context/SocketContext";
import { PostContext } from "../Context/PostContext";


interface ContentProps {
  post: {
    type: postDataProps["type"];
    src: postDataProps["url"];
  };
}

const Content: React.FC<ContentProps> = ({ post }) => {
  if (/(jpe?g|png|gif|bmp|webp|heic|heif|tiff?)$/i.test(post.type)) {
    return (
      <img className="h-full p-10 rounded-md" src={post.src} alt="something." />
    );
  }
  return <></>;
};

interface PostPageProps {
  postData: postDataProps;
  onLike : () => void;
}

interface PostUIProps {
  postData: postDataProps;
  extended: boolean;
}

const customDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day}-${month}-${year}`;
};

const PostUI: React.FC<PostUIProps> = ({ postData, extended}) => {
  const { setLikeCount, setLiked } = useContext(PostContext)

  const { socket } = useSocket()

  const { onLike , setToastInfo , toastMessage } = useContext(AppContext)
  const userId = useSelector<RootState>(state => state.auth.userInfo?.id)



  useEffect(() => { 
    if(socket){ 
      socket.on("post_like" , data => { 
        setLikeCount(prev => prev + 1)
        if(data.user_id === userId){
          setLiked(true)
        }
      })

      socket.on("post_unlike" , data => {
        setLikeCount(prev => prev - 1)
        if(data.user_id === userId){
          setLiked(false)
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [socket])

  const likeHandler = async () => { 
    if(userId && postData.id){ 
      try{
        const response = await onLike("post" , postData.id, +userId)
        if(response && response.data){ 
          if(response.data === "like"){ 
            socket?.emit("post_like" , { 
              post_id : postData.id,
              user_id : userId
            })
          }
          else if(response.data === "unlike"){ 
            socket?.emit("post_unlike" , { 
              post_id : postData.id,
              user_id : userId
            })
          }
        }

      }catch(err){ 
        console.log(err)
        if(err){
          if(!toastMessage) setToastInfo("Nemůžete dát like tomuto příspěvku. Zkuste to později." , "warning")
        }
      }
    }
  }
 
  if (extended) {
    return <ExtendedPostUI postData={{ ...postData }} onLike={likeHandler} />;
  } else {
    return <NormalPostUI postData={postData} onLike={likeHandler}  />;
  }
};

const ExtendedPostUI: React.FC<PostPageProps> = ({ postData , onLike }) => {
  const {  likeCount , liked } = useContext(PostContext)
  
  return (
    <div className="flex max-h-[70vh] w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-center bg-black ">
        <Content post={{ type: postData.type, src: postData.url }} />
      </div>

      <div className="w-2/3 min-w-[40%] max-h-[100%] p-4 flex flex-col">
        <section className="flex items-center justify-around">
          <Link
            to={`/profile/${postData.username}`}
            className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <h1 className="text-sm font-semibold">{postData.username}</h1>
          </Link>

          <p className="text-gray-400">
            {customDate(new Date(postData.created_at))}
          </p>
        </section>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          {postData.title || "Obrázek bez popisu"}
        </h1>

        <p className="mt-2 overflow-y-scroll text-xs text-gray-600">
          {postData.description}
        </p>

        <div className="flex items-center justify-between mt-auto text-xs text-gray-500">
          <button className="flex items-center gap-2" onClick={onLike}>
            <FaHeart color={liked ? "red" : "gray"} />  {likeCount}
          </button>
          <div className="flex items-center gap-2">
            <FiMessageSquare /> {postData.comment_count}
          </div>
          <FiBookmark />
        </div>
      </div>
    </div>
  );
};

// owner views

const NormalPostUI: React.FC<PostPageProps> = ({ postData }) => {
  return (
    <>
      <div
        key={postData.id}
        className={`relative w-full aspect-square p-4 bg-gray-100 rounded-lg shadow-md transition `}
      >
        <Link
          to={`/profile/${postData.username}`}
          className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80"
        >
          <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          <h1 className="text-sm font-semibold text-gray-600">{postData.username}</h1>
        </Link>

        <h2 className="text-3xl font-bold text-center text-gray-600">
          {postData.title || "Obrázek bez popisu"}
        </h2>

        <section className="flex items-center justify-center h-full p-5">
          <Content post={{ type: postData.type, src: postData.url }} />
        </section>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">
            {customDate(new Date(postData.created_at))}
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <FiHeart className="mr-1" /> {postData.like_count}
            </div>
            <div className="flex items-center text-gray-500">
              <FiMessageSquare className="mr-1" /> {postData.comment_count}
            </div>
            <FiBookmark className="text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUI;
