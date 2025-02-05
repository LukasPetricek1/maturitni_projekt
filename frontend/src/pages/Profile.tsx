import React, { useEffect, useRef, useState } from "react";
import {
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { LuSendHorizonal as SendIcon } from "react-icons/lu";
import { FaPlus as CreateIcon } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import BackgroundImage from "../assets/background.jpeg";
import { Link } from "react-router-dom";

import Post from "../components/Post";

import { articles } from "../data/articles";
import { stories } from "../data/stories";
import Article from "../components/Article";

import AccountSettings from "../components/AccountSettings";
import axiosInstance from "../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { authProps } from "../redux-store/auth";
import { useFetch } from "../hooks/useFetch";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const interests = ["tenis", "běhání", "programování"];

export interface userProps {
  email: string;
  id: number;
  specific_id: string;
  name: string;
  profile_picture?: string;
  theme_picture?: string;
  username: string;
  website: string;
  status: string;
  bio: string;
}

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
const Profile: React.FC = () => {
  const location = useLocation()
  const { account_id } = useParams();
  const [visibleAboutMe, setShowAboutMe] = useState(false);
  const [visibleSettings, setShowSettings] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const ownerCredentials: authProps["credentials"] = useSelector<RootState>(
    (state) => state.auth.credentials
  );

  // user fetching function
  async function fetchUser() {
    const user = await axiosInstance.get("/users/" + account_id);
    return user.data[0];
  }

  const {
    isFetching,
    data: user,
    error,
  } = useFetch({
    fetchFn: fetchUser,
    initialValue: [],
    reCall: location.pathname
  });

  useEffect(() => {
    if(error){ 
      throw new Response('Data nebyla nalezena', { status: 404 });
    }
  } ,[error])

  useEffect(() => {

    if (ownerCredentials && ownerCredentials?.username && user && user.username) {
      if (ownerCredentials.username == user!.username) {
        setIsOwner(true);
      }else{ 
        setIsOwner(false)
      }
    }
  }, [ownerCredentials, user]);


  if (isFetching) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center flex-col">
        <div className="animate-spin rounded-full aspect-square  w-20 border-t-4 border-purple-500 border-opacity-50"></div>
        <p className="mt-2 text-gray-400">Načítám data...</p>
      </div>
    );
  }

  const showAboutMe = () => {
    setShowAboutMe(true);
  };

  const hideAboutMe = () => {
    setShowAboutMe(false);
  };

  const showSettings = () => {
    setShowSettings(true);
  };

  const hideSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-start">
        {visibleAboutMe && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black/40 z-40">
            <div className="h-fit bg-white rounded-lg p-4 w-fit max-w-[40%] border border-gray-300 z-10 ">
              <h2 className="text-purple-500 text-lg font-semibold mb-2">
                O mně
              </h2>
              <div className="text-blue-500 mb-5">
                <a href={user && user.website}>{user && user.website}</a>
              </div>
              <p className="text-gray-700 text-sm">{user && user.bio}</p>
              <section className="w-full flex justify-end">
                <button
                  onClick={hideAboutMe}
                  className="m-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-lg shadow-md hover:bg-gray-300 transition"
                >
                  Zavřít
                </button>
                {!isOwner && (
                  <button className="flex items-center gap-1 m-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-500 transition">
                    <SendIcon />
                    <p>Napsat</p>
                  </button>
                )}
              </section>
            </div>
          </div>
        )}

        {visibleSettings && (
          <AccountSettings onClose={hideSettings} initialData={user && user} />
        )}

        <div
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className={`relative w-1/2 h-96 bg-cover bg-center rounded-xl flex items-center justify-center text-center`}
        >
          {isOwner && (
            <button
              className="absolute top-5 -right-16 text-purple-500"
              onClick={showSettings}
            >
              <FaEdit size={40} />
            </button>
          )}
        </div>

        <div className="relative w-full max-w-screen-sm -mt-10 px-4">
          <div className="flex items-center">
            <div>
              <div className="w-20 h-20 rounded-full bg-gray-500 border-4 border-white"></div>
            </div>

            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">{account_id}</h2>
              <button className="text-sm text-purple-400">
                <Link to="friends">Seznam přátel</Link>
              </button>
            </div>

            <button
              onClick={showAboutMe}
              className="ml-auto bg-purple-700 text-white py-3 px-5 rounded-md hover:bg-purple-500 transition"
            >
              O mně
            </button>
          </div>
        </div>

        <div className="text-blue-500">
          <a href={user && user.website}>{user && user.website}</a>
        </div>

        {location.pathname.includes("friends") ? (
          <Outlet context={{ user_id : user.id }}  />
        ) : (
          <>
            <div className="w-full max-w-screen-sm mt-8 px-4">
              <h3 className="text-lg font-bold text-white">Zájmy</h3>

              <div className="flex flex-wrap gap-2 mt-4">
                {interests.map((interest, index) => (
                  <Link
                    to={`/discover/users?selected_hobbies=${interest}`}
                    key={index}
                    className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm shadow-md hover:bg-purple-600 cursor-pointer"
                  >
                    {interest}
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full max-w-screen-sm mt-6 px-4">
              <SavedStories isOwner={isOwner} />
            </div>

            {user.id && (
              <div className="mt-5 w-1/2 flex flex-col items-center">
                <SubNavigation
                  userId={user.id}
                  username={account_id!}
                  isOwner={isOwner}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

const SavedStories: React.FC<{ isOwner: boolean }> = ({ isOwner }) => {
  const [savedStories] = useState([1, 2, 3]);

  const saveAnotherStory = () => {
    alert("Uložit další příběh");
  };

  return (
    <>
      <h3 className="text-lg font-bold text-white">Uložené příběhy</h3>

      <div className="flex gap-4 items-center p-5">
        {savedStories.map((storyId) => {
          const { id, url } = stories[storyId - 1];

          return (
            <button key={id} onClick={() => alert("příběh " + id)}>
              <div className="flex flex-col items-center">
                <div
                  style={{ backgroundImage: `url(${url})` }}
                  className="h-16 w-16 rounded-full bg-cover bg-center"
                ></div>
                <p className="mt-2 text-sm text-white">Nazev</p>
              </div>
            </button>
          );
        })}

        {isOwner && (
          <button onClick={() => saveAnotherStory()}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-300">
                <CreateIcon />
              </div>
              <p className="mt-2 text-sm text-white">Nové</p>
            </div>
          </button>
        )}
      </div>
    </>
  );
};

const SubNavigation: React.FC<{
  username: string;
  isOwner: boolean;
  userId: number;
}> = ({ username, isOwner, userId }) => {
  const location = useLocation();
  const activeSection = useRef<string | null>(
    location.hash && location.hash.match(/\w+/g)![0]
  );

  async function fetchPosts() {
    const response = await axiosInstance.get(`/users/posts?id=${userId}`);
    const data = response.data;
    // .then(response => {
    //   if(Object.getPrototypeOf(response.data) == Array.prototype){
    //     setPosts(response.data)
    //   }
    // })
    // .catch(err => console.log(err))
    return data;
  }

  const { data: posts, isFetching } = useFetch({
    fetchFn: fetchPosts,
    initialValue: [],
  });

  const [activeTab, setActiveTab] = useState(activeSection.current || "posts");

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  const tabs = ["posts", "articles"];

  return (
    <>
      <div className="w-full flex justify-center gap-8 border-b p-2 border-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold text-sm ${
              activeTab === tab
                ? "text-purple-500 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isFetching && (
        <div className="w-full h-full">
          <Skeleton baseColor="#6e6e6e" count={5} />
        </div>
      )}

      {!isFetching && <div className="w-full mt-6">
        {activeTab === "posts" && (
          <section className="grid grid-cols-2 gap-5 p-5">
            {(() => {
              if (!posts.length)
                return (
                  <p className="text-gray-500 text-2xl text-nowrap">
                    {!isOwner ? (
                      <>
                        <b>{username}</b> zatím nepřidal/a žádné příspěvky.{" "}
                      </>
                    ) : (
                      "Zatím jste nepřidali žádné příspěvky."
                    )}
                  </p>
                );
              return posts.map((post) => (
                <Post key={post.id} extended={false} post={post} />
              ));
            })()}
          </section>
        )}
        {activeTab === "articles" && (
          <div className="grid grid-cols-2 gap-5 p-5">
            {(() => {
              const userArticles = articles.filter(
                (article) => article.author === username
              );
              if (!userArticles.length)
                return (
                  <>
                    <p className="text-gray-500 text-2xl text-nowrap">
                      {!isOwner ? (
                        <>
                          <b>{username}</b> zatím nepublikoval/a žádné články.
                        </>
                      ) : (
                        "Zatím jste nepublikovali žádné články."
                      )}
                    </p>
                  </>
                );

              return userArticles.map((article) => (
                <Article key={article.id} {...article} extended={false} />
              ));
            })()}
          </div>
        )}
      </div>}
    </>
  );
};

export default Profile;
