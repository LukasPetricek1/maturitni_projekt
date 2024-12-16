import React from "react"

import ArticleUI from "./ArticleUI";
import { Link } from "react-router-dom";

import { ArticleProps } from "./ArticleUI";

const Article : React.FC<ArticleProps> = (props) => { 
  return (
    <>
      <Link to={`/article/${props.id}`} className="w-full">
        <ArticleUI {...props }/>
      </Link>
    </>
  )
}

export default Article;