import React from "react";
import { useLoaderData } from "react-router-dom";

import PostUI from "../components/PostUI";
import { postDataProps } from "../data/posts";



const PostPage: React.FC = () => {
  const loader : postDataProps = useLoaderData()

  console.log(loader)

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        <div className="w-[90%] flex justify-center items-center max-h-[60vh]">
          <PostUI extended={true} postData={loader} />
        </div>
      </section>
    </>
  );
};

export default PostPage;
