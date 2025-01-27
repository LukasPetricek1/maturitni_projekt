import React from "react";
import { Link } from "react-router-dom";

import { postDataProps } from "../data/posts";

import { FiHeart, FiBookmark, FiMessageSquare } from "react-icons/fi";

interface ContentProps {
  post: {
    type: postDataProps["contentType"];
    src: postDataProps["contentSrc"];
  };
}

const Content: React.FC<ContentProps> = ({ post }) => {
  if (post.type === "image") {
    return <img className="rounded-md" src={post.src} alt="something." />;
  }

  return <></>;
};

interface PostPageProps {
  postData: postDataProps;
  extended: boolean;
}

const PostUI: React.FC<PostPageProps> = ({ postData , extended }) => {
  return (
    <>
      <div
        key={postData.id}
        className={`relative w-full aspect-square p-4 bg-gray-100 rounded-lg shadow-md transition ${!extended && "hover:bg-purple-200"}`}
      >
        {extended && <Link
          to={`/profile/${postData.username}`}
          className="flex w-full text-black items-center gap-5 p-2 pl-0 m-2 origin-left hover:scale-105 cursor-pointer transition"
        >
          <div className="h-10 aspect-square rounded-full bg-gray-500"></div>
          <h1>{postData.username}</h1>
        </Link>}

        <h2 className="font-bold text-gray-600">
          {postData.title || "Obrázek bez popisu"}
        </h2>
        

        <section className="w-full p-5">
          <Content
            post={{ type: postData.contentType, src: postData.contentSrc }}
          />
        </section>

        {extended && <p className="text-sm text-gray-500">{postData.description}</p>}

        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400">{postData.date}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <FiHeart className="mr-1" /> {postData.likes}
            </div>
            <div className="flex items-center text-gray-500">
              <FiMessageSquare className="mr-1" /> {postData.comments}
            </div>
            <FiBookmark className="text-gray-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostUI;
