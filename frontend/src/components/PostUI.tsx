import React from "react";
import { Link } from "react-router-dom";

import { postDataProps } from "../data/posts";

import { FiHeart, FiBookmark, FiMessageSquare } from "react-icons/fi";

interface ContentProps {
  post: {
    type: postDataProps["type"];
    src: postDataProps["url"];
  };
}

const Content: React.FC<ContentProps> = ({ post }) => {
  if (/(jpe?g|png|gif|bmp|webp|heic|heif|tiff?)$/i.test(post.type)) {
    return (
      <img className="rounded-md p-10 h-full" src={post.src} alt="something." />
    );
  }
  return <></>;
};

interface PostPageProps {
  postData: postDataProps;
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

const PostUI: React.FC<PostUIProps> = ({ postData, extended }) => {
  if (extended) {
    return <ExtendedPostUI postData={postData} />;
  } else {
    return <NormalPostUI postData={postData} />;
  }
};

const ExtendedPostUI: React.FC<PostPageProps> = ({ postData }) => {
  return (
    <div className="flex max-h-[70vh] w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className=" bg-black flex justify-center items-center">
        <Content post={{ type: postData.type, src: postData.url }} />
      </div>

      <div className="w-2/3 min-w-[40%] max-h-[100%] p-4 flex flex-col">
        <section className="flex items-center justify-around">
          <Link
            to={`/profile/${postData.username}`}
            className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80"
          >
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
            <h1 className="font-semibold text-sm">{postData.username}</h1>
          </Link>

          <p className="text-gray-400">
            {customDate(new Date(postData.created_at))}
          </p>
        </section>

        <h1 className="font-bold text-gray-800 text-3xl text-center">
          {postData.title || "Obrázek bez popisu"}
        </h1>

        <p className="text-xs text-gray-600 mt-2  overflow-y-scroll">
          {postData.description}
        </p>

        <div className="flex justify-between items-center mt-auto text-gray-500 text-xs">
          <div className="flex items-center gap-2">
            <FiHeart /> {postData.like_count}
          </div>
          <div className="flex items-center gap-2">
            <FiMessageSquare /> {postData.comment_count}
          </div>
          <FiBookmark />
        </div>
      </div>
    </div>
  );
};

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
          <div className="h-10 w-10 rounded-full bg-gray-600"></div>
          <h1 className="font-semibold text-sm text-gray-600">{postData.username}</h1>
        </Link>

        <h2 className="font-bold text-gray-600 text-center text-3xl">
          {postData.title || "Obrázek bez popisu"}
        </h2>

        <section className="h-full p-5 flex justify-center items-center">
          <Content post={{ type: postData.type, src: postData.url }} />
        </section>

        <div className="flex justify-between items-center mt-4">
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
