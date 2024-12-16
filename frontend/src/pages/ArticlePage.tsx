import React from "react"
import { useParams } from "react-router-dom";

import { articles } from "../data/articles";
import Article from "../components/Article";

const ArticlePage : React.FC = () => { 
  const params = useParams();
  const article_id = Number(params["article_id"]!);

  const currentArticle = articles.filter(article => article.id === article_id)[0]

  return (
    <section className="w-full h-full flex justify-center items-center p-10">
      <div className="w-[80%]">
        <Article {...currentArticle} extended />
      </div>
    </section>
  )
}

export default ArticlePage;