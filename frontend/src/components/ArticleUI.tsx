import React from "react";

import DOMPurify from "dompurify";

import { ArticleProps as Props } from "../data/articles";
import ImagePlaceholder from "../assets/image-placeholder.svg"

export interface ArticleProps extends Props{
  extended? : boolean
}

const ArticleUI: React.FC<ArticleProps> = ({
  title,
  subtitle,
  author,
  createdAt,
  content,
  extended,
  theme_picture
}) => {

  return (
    <div className={`w-full  aspect-video mx-auto p-6 bg-gray-600/50  rounded-lg shadow-lg ${!extended && "hover:bg-gray-500/50"} transition`}>

      <header className="mb-6">
        <h1 className="text-4xl font-bold text-purple-600 mb-2">{title}</h1>
        <h2 className="text-xl text-gray-600 italic">{subtitle}</h2>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
          <p>By {author}</p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </header>

      <img src={theme_picture || ImagePlaceholder} alt="theme picture" className="w-full aspect-video" />

        <article
          className="w-full text-justify prose text-white p-5"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(extended ? content : content.slice(0,50) + " ...") }}
        ></article>

  
      <footer className="mt-8 border-t pt-4 text-sm text-gray-500">
        <p>
          Published by <span className="font-semibold">{author}</span> on{" "}
          {new Date(createdAt).toLocaleDateString()}.
        </p>
      </footer>
    </div>
  );
};

export default ArticleUI;