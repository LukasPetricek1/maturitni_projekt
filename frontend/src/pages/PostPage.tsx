import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostUI from "../components/PostUI";
import axiosInstance from "../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { useFetch } from "../hooks/useFetch";
import { PostContext } from "../Context/PostContext";

const PostPage: React.FC = () => {
  const { post_id } = useParams();
  const userId = useSelector<RootState>((state) => state.auth.userInfo?.id);
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)

  async function fetch_post() {
    if (userId) {
      const response = await axiosInstance.get(
        `/posts/${post_id}?user_id=${userId}`
      );

      if (response.data.length === 0) {
        return [];
      } else {
        return response.data[0];
      }
    }
  }

  const { data } = useFetch({
    fetchFn: fetch_post,
    initialValue: [],
    reCall: userId,
  });

  useEffect(() => {
    if (data) {
      if (data.like_count) {
        setLikeCount(data.like_count);
      }
      if (data.is_liked) {
        setLiked(true);
      }
    }
  }, [data, setLikeCount, setLiked]);

  return (
    <PostContext.Provider value={{ likeCount , liked , setLikeCount , setLiked }}>
      <section className="flex items-center justify-center w-full h-full">
        <div className="w-[90%] flex justify-center items-center max-h-[60vh]">
          {data && (
            <PostUI
              extended={true}
              postData={data}
            />
          )}
        </div>
      </section>
    </PostContext.Provider>
  );
};

export default PostPage;
