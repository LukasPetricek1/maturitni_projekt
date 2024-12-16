import React from "react";
import { useParams} from "react-router-dom";

import { postsData} from "../data/posts";
import PostUI from "../components/PostUI";



const PostPage: React.FC = () => {
  const params = useParams();
  const post_id = Number(params["post_id"]!);

  const current_post = postsData.filter((post) => post.id === post_id)[0]

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        <div className="w-1/2">
          <PostUI extended={true} postData={current_post} />
        </div>
      </section>
    </>
  );
};

export default PostPage;
