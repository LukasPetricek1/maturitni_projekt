import React from "react";
import { Link } from "react-router-dom";
import PostUI from "./PostUI";

import { postDataProps } from "../data/posts";

interface PostProps{ 
  post : postDataProps;
  extended : boolean
}

const Post: React.FC<PostProps> = ({ post , extended  }) => {
  return (
    <>
      <Link to={`/post/${post.id}`} className="transition cursor-default">
        <PostUI key={post.id} extended={extended} postData={post} />
      </Link>
    </>
  );
};

export default Post;
