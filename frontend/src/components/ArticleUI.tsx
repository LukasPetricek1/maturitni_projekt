import React, { useContext } from "react";

import DOMPurify from "dompurify";
import { ArticleProps } from "../Context/ArticleContext";

const ArticleUI: React.FC<ArticleProps> = (data) => {
  
  if(!data.extended){ 
    return <NormalArticle data={data} />
  }else{ 
    return <ExtendedArticle data={data} />
  }

};

export default ArticleUI;

const NormalArticle : React.FC<{ data : ArticleProps}> = ({ data }) => { 

  const { extended, title, subtitle, created_at, username , content } = data

  return (
    <div
      className={`w-full mx-auto p-6 bg-gray-600/30  rounded-lg shadow-lg ${
        !extended && "hover:bg-gray-500/50"
      } transition`}
    >
      <header className="mb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-purple-600">{title}</h1>
        <h2 className="text-xl italic text-gray-600">{subtitle}</h2>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <p>By {username}</p>
          <p>{new Date(created_at).toLocaleDateString()}</p>
        </div>
      </header>

      <article
        className="w-full p-5 prose text-justify text-white"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            extended ? content : content.slice(0, 50) + " ..."
          ),
        }}
      ></article>

      <footer className="pt-4 mt-8 text-sm text-gray-500 border-t">
        <p>
          Published by <span className="font-semibold">{username}</span> on{" "}
          {new Date(created_at).toLocaleDateString()}.
        </p>
      </footer>
    </div>
  );
}

const ExtendedArticle : React.FC<{ data : ArticleProps }> = ({ data }) => { 

  const { extended, title, subtitle, created_at, username , content } = data

  return (
    <div
      className={`w-full text-center  mx-auto p-6 bg-gray-600/50  rounded-lg shadow-lg ${
        !extended && "hover:bg-gray-500/50"
      } transition`}
    >
      <header className="mb-6">
        <h1 className="mb-2 text-4xl font-bold text-purple-600">{title}</h1>
        <h2 className="text-xl italic text-gray-600">{subtitle}</h2>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <p>By {username}</p>
          <p>{new Date(created_at).toLocaleDateString()}</p>
        </div>
      </header>

      <article
        className="w-full p-5 text-white"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            extended ? content : content.slice(0, 50) + " ..."
          ),
        }}
      ></article>

      <footer className="pt-4 mt-8 text-sm text-gray-500 border-t">
        <p>
          Published by <span className="font-semibold">{username}</span> on{" "}
          {new Date(created_at).toLocaleDateString()}.
        </p>
      </footer>
    </div>
  );
}