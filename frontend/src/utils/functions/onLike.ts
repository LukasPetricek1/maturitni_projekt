import axiosInstance from "../../axios/instance";
import { AxiosPromise } from "axios";

export const onLike = (target: string, target_id: number, user_id: number): AxiosPromise<string> => {

  if (target === "post") { 
    const post_id = target_id;
    return axiosInstance.post(`/posts/like/${post_id}?user_id=${user_id}`);

  } else if (target === "article") { 
    console.log("article like");
    const article_id = target_id;
    return axiosInstance.post(`/articles/like/${article_id}?user_id=${user_id}`);// Explicitně vrací `void`
  }

  return axiosInstance.post(`/articles/like/${target_id}?user_id=${user_id}`);// Explic
};
