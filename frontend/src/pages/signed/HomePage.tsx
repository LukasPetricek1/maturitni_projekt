import React from "react";

import ListOfFriends from "../../components/ListOfFriends";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

import Post from "../../components/Post";

import { stories } from "../../data/stories";
import { friendsData } from "../../data/friendsData";
// import { postsData } from "../../data/posts";
import { articles } from "../../data/articles";

import Article from "../../components/Article";
import UnSignedHome from "../unsigned/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";

interface postDataProps {
  id: number;
  username: string;
  title: string;
  description: string;
  contentType: "image" | "video";
  contentSrc: string;
  date: string;
  likes: number;
  comments: number;
}

const POSSIBLE_SECTIONS = ["příspěvky", "články"];

const SignedHome: React.FC = () => {
  
  const [activeView, setActiveView] = useSearchParams();
  const loader = useLoaderData() as postDataProps[];
  const logged =useSelector<RootState>(state => state.auth.isAuth)

  if(!logged){ 
    return <UnSignedHome />
  }

  
  const activeSection = activeView.get("view");

  const handleCurrentSection = (section: string) => {
    setActiveView(`view=${section}`);
  };

  return (
    <>
      <div className="relative grid grid-cols-12 min-h-screen w-full">

        <div className="w-full col-span-9 text-white p-8">
        
          <div className="flex w-full overflow-x-scroll overflow-y-hidden justify-self-center gap-5 mt-8 p-5">
            {stories.map((story, idx) => {
              let username = story.username;
              if (username.length > 9) {
                username = username.slice(0, 9) + "...";
              }

              return (
                <Link key={idx} to={`/stories/${idx + 1}`}>
                  <button key={idx} className="flex flex-col items-center">
                    <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
                    <span className="text-sm mt-2">{username}</span>
                  </button>
                </Link>
              );
            })}
          </div>

          
          <div className="mt-8">
            <div className="flex space-x-4 border-b border-gray-200 pb-2 mb-4">
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
              <div className="grid grid-cols-3 gap-10">
                {loader && loader.map((post) => (
                  <Post key={post.id} extended={false} post={post} />
                ))}
              </div>
            )}

            {activeSection === "články" && (
              <section className="w-full flex justify-center">
                <div className="w-2/3 flex flex-col gap-5">
                  {articles.map((article, index) => (
                    <Article key={index} {...article} extended={false} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        
        <section className="col-span-3 rounded-xl overflow-y-scroll max-h-full w-full relative right-0 flex flex-col gap-5 p-10 scrollbar-disabled">
          <ListOfFriends friendsList={friendsData} />
        </section>
      </div>
    </>
  );
};

export default SignedHome;