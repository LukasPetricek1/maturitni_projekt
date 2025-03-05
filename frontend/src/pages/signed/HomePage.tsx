import React, { useLayoutEffect, useState } from "react";

import ListOfFriends from "../../components/friends/ListOfFriends";
import { Link, useSearchParams } from "react-router-dom";

import Post from "../../components/Post";

import { stories } from "../../data/stories";
import { articles } from "../../data/articles";

import Article from "../../components/Article";
import UnSignedHome from "../unsigned/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";
import axiosInstance from "../../axios/instance";

export interface Person {
  id : number;
  name : string;
  username: string;
  profile_picture : string; 
}

const POSSIBLE_SECTIONS = ["příspěvky", "články"];

const SignedHome: React.FC = () => {

  
  const [activeView, setActiveView] = useSearchParams();
  const [loader, setLoader] = useState({ 
    articles : [],
    posts: []
  })
  const logged = useSelector<RootState>(state => state.auth.isAuth)
  const id : number = useSelector<RootState>(state => state.auth.userInfo?.id)

  useLayoutEffect(() => { 
    if(id){
      axiosInstance.get("/posts" , { 
        params : { 
         user_id : id
       },
       withCredentials : true
     }).then(({data}) => {
      setLoader(prev => ({ 
        ...prev,
        posts: data
      }))
     })

     axiosInstance.get("/articles")
     .then(({ data }) => { 
      setLoader(prev => ({ 
        ...prev, 
        articles : data
      }))
     })
    }
  } , [id])


  if(!logged){ 
    return <UnSignedHome />
  }

  
  const activeSection = activeView.get("view");

  const handleCurrentSection = (section: string) => {
    setActiveView(`view=${section}`);
  };

  return (
    <>
      <div className="relative grid w-full min-h-screen grid-cols-12">

        <div className="w-full col-span-9 p-8 text-white">
        
          <div className="flex w-full gap-5 p-5 mt-8 overflow-x-scroll overflow-y-hidden justify-self-center">
            {stories.map((story, idx) => {
              let username = story.username;
              if (username.length > 9) {
                username = username.slice(0, 9) + "...";
              }

              return (
                <Link key={idx} to={`/stories/${idx + 1}`}>
                  <button key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <span className="mt-2 text-sm">{username}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          
          <div className="mt-8">
            <div className="flex pb-2 mb-4 space-x-4 border-b border-gray-200">
              {POSSIBLE_SECTIONS.map((section, index) => (
                <button
                  key={index}
                  onClick={() => handleCurrentSection(section)}
                  className={`text-${
                    activeSection === section ||
                    (activeSection === null && section === "příspěvky")
                      ? "purple-500"
                      : "white"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

        
            {(activeSection === "příspěvky" || activeSection === null) && (
              <div className="flex flex-col gap-5 justify-center px-60 pt-20 items-center min-w-[1000px]">
                {loader && loader.posts.map((post) => (
                  <Post key={post.id} extended={false} post={post} />
                ))}
              </div>
            )}

            {activeSection === "články" && (
              <section className="flex justify-center w-full">
                <div className="flex flex-col w-2/3 gap-5">
                  {loader && loader.articles.map((article, index) => (
                    <Article key={index} {...article} extended={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        
        {id && <section className="relative right-0 flex flex-col w-full max-h-full col-span-3 gap-5 p-10 overflow-y-scroll rounded-xl scrollbar-disabled">
          <ListOfFriends user_id={id} />
        </section>}
      </div>
    </>
  );
};

export default SignedHome;