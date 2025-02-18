import React from "react"
import { useParams } from "react-router-dom";

import ArticleUI from "../components/ArticleUI";
import axiosInstance from "../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { useFetch } from "../hooks/useFetch";

const ArticlePage : React.FC = () => { 
  const params = useParams();
  const article_id = Number(params["article_id"]!);
  const userId : number = useSelector<RootState>(state => state.auth.userInfo?.id)


  const fetchArticles = async () => { 
    const response = await axiosInstance.get(`/articles/${article_id}?user_id=${userId}`)
    return response.data;
  }

  const {data : articleData} = useFetch({
    fetchFn : fetchArticles,
    initialValue : [],
    reCall : userId
  })

  return (
    <section className="flex items-center justify-center w-full h-full p-10">
      <div className="w-[80%]">
        {articleData && <ArticleUI {...articleData} extended />}
      </div>
    </section>
  )
}

export default ArticlePage;