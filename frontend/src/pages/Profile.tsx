import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

import { Tooltip } from "react-tooltip";

import { LuSendHorizonal as SendIcon } from "react-icons/lu";
import { FaPlus as CreateIcon } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoMdPersonAdd as AddPerson } from "react-icons/io";
import { FiUserCheck as IsFriend } from "react-icons/fi";

import { Link } from "react-router-dom";

import Post from "../components/Post";

import { articles } from "../data/articles";
import { stories } from "../data/stories";
import Article from "../components/Article";

import AccountSettings from "../components/AccountSettings";
import axiosInstance from "../axios/instance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { addChat, authProps } from "../redux-store/auth";
import { useFetch } from "../hooks/useFetch";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import FriendOptions from "../components/friends/FriendOptions";
import ImageComponent from "../components/ImageComponent";

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
  hobbies: string
}

const Profile: React.FC = () => {
  const { setToastInfo } = useContext(AppContext);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const { account_id } = useParams();
  const [visibleAboutMe, setShowAboutMe] = useState(false);
  const [visibleSettings, setShowSettings] = useState(false);

  const [relations, setRelations] = useState({
    isOwner: false,
    isFriend: false,
  });

  const chats = useSelector<RootState>(state => state.auth.chats)
  const ownerInfo: authProps["userInfo"] = useSelector<RootState>(
    (state) => state.auth.userInfo
  );

  const friends: authProps["friends"] = useSelector<RootState>(
    (state) => state.auth.friends
  );

  // user fetching function
  async function fetchUser() {
    const user = await axiosInstance.get("/users/" + account_id);
    return user.data[0];
  }

  const findFriendById = (
    friends: {
      id: number;
      name: string;
      profile_picture: string | null;
      username: string;
    }[],
    id: number
  ) => {
    return friends.find((friend) => friend.id === id) || null;
  };

  const {
    isFetching,
    data: user,
    error,
  } = useFetch({
    fetchFn: fetchUser,
    initialValue: [],
    reCall: ownerInfo!.id,
  });


  useEffect(() => {
    if (error) {
      throw new Response("Data nebyla nalezena", { status: 404 });
    }
  }, [error]);

  useEffect(() => {
    if (
      ownerInfo &&
      ownerInfo?.id &&
      user &&
      user.id &&
      friends
    ) {
      if (findFriendById(friends, user.id)) {
        setRelations((prev) => ({ ...prev, isFriend: true }));
      } else {
        setRelations((prev) => ({ ...prev, isFriend: false }));
      }

      if (ownerInfo.id == user!.id) {
        setRelations((prev) => ({ ...prev, isOwner: true }));
      } else {
        setRelations((prev) => ({ ...prev, isOwner: false }));
      }
    }
  }, [friends, ownerInfo, user]);

  if (isFetching) {
    return (
      <div className="relative flex flex-col items-center justify-center w-full h-screen">
        <div className="w-20 border-t-4 border-purple-500 border-opacity-50 rounded-full animate-spin aspect-square"></div>
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

  const friendAction = () => {
    if (ownerInfo && ownerInfo.id && user && user.id) {
      if (!relations.isFriend) {
        axiosInstance
          .post("/friends/send_invitation", {
            user_id_1: ownerInfo.id,
            user_id_2: user.id,
          })
          .then(({ data }) => {
            if (data.sqlState) {
              if (data.sqlState === "10000") {
                setToastInfo("Pozvánka již byla odeslána.", "warning");
              }
            } else {
              setToastInfo("Pozvánka úapěšně odeslána.", "success");
            }
          })
          .catch(() => {
            setToastInfo(
              "Přátelství nebylo možné navázat. Zkuste to později.",
              "error"
            );
          });
      } else {
        setToastInfo(`S uživatelem ${user.username} jste přátelé.`, "success");
      }
    }
  };

  const blockUser = () => {};

  const removeFriend = () => {
    if (ownerInfo && ownerInfo.id && user && user.id) {
      axiosInstance.post("/friends/delete", {
        user_id_1: ownerInfo?.id,
        user_id_2: user.id,
      })
      .then(() => { 
        setToastInfo(`Obebrali jste přítele ${user.username}` , "success")
      })
      .catch(err => console.log(err))
    }
  };

  const getInTouch = () => {
      if(!chats || !chats.some(chat => chat.id === user.id)){
        dispatch(addChat({
          id : user.id,
          name : user.name,
          profile_picture : user.profile_picture,
          username : user.username
        }))
    
      navigate("/chat/@me/" + user.username)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start w-full min-h-screen">
        {visibleAboutMe && (
          <div className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen backdrop-blur-sm bg-black/40">
            <div className="h-fit bg-white rounded-lg p-4 w-fit max-w-[40%] border border-gray-300 z-10 ">
              <h2 className="mb-2 text-lg font-semibold text-purple-500">
                O mně
              </h2>
              <div className="mb-5 text-blue-500">
                <a href={user && user.website}>{user && user.website}</a>
              </div>
              <p className="text-sm text-gray-700">{user && user.bio}</p>
              <section className="flex justify-end w-full">
                <button
                  onClick={hideAboutMe}
                  className="px-4 py-2 m-2 text-gray-600 transition bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
                >
                  Zavřít
                </button>
                {!relations.isOwner && (
                  <>
                    <Tooltip
                      id="msg-btn"
                      style={{ backgroundColor: "purple" }}
                    />
                    <button
                      onClick={getInTouch}
                      data-tooltip-content="Musíte být přátelé, abyste si mohli psát."
                      data-tooltip-id="msg-btn"
                      data-tooltip-place="bottom"
                      data-tooltip-hidden={relations.isFriend}
                      disabled={!relations.isFriend}
                      className="flex items-center gap-1 px-4 py-2 m-2 text-white transition bg-purple-600 rounded-lg shadow-md hover:bg-purple-500 disabled:bg-gray-500 disabled:hover:scale-100"
                    >
                      <SendIcon />
                      <p>Napsat</p>
                    </button>
                  </>
                )}
              </section>
            </div>
          </div>
        )}

        {visibleSettings && (
          <AccountSettings onClose={hideSettings} initialData={user && user} />
        )}

        <div
          className={`relative w-full h-full bg-cover bg-center rounded-xl flex items-center justify-center text-center`}
        >
        <ImageComponent For="theme-picture" user_id={user.id} src={user && user.theme_picture} disabled={!relations.isOwner}/>
          {relations.isOwner && (
            <button
              className="absolute text-purple-500 top-5 right-16"
              onClick={showSettings}
            >
              <FaEdit size={40} />
            </button>
          )}
        </div>

        <div className="relative w-[50%] my-5 px-4 ">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div>
                <ImageComponent For="profile-picture" user_id={user.id} src={user && user.profile_picture} disabled={!relations.isOwner} />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-white">{account_id}</h2>
                <button className="text-sm text-purple-400">
                  <Link to="friends">Seznam přátel</Link>
                </button>
              </div>
            </div>

            <div className="flex w-full gap-10">
              <button
                onClick={showAboutMe}
                className="px-5 py-3 ml-auto text-purple-500 transition border border-purple-500 rounded-md hover:bg-purple-500 hover:text-white"
              >
                O mně
              </button>
              {!relations.isOwner && (
                <>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={friendAction}
                      className="px-5 py-3 ml-auto text-white transition bg-purple-700 rounded-md  hover:bg-purple-500"
                    >
                      {!relations.isFriend ? (
                        <p className="flex items-center gap-2">
                          <AddPerson /> Přidat do přátel
                        </p>
                      ) : (
                        <p className="flex items-center gap-2">
                          <IsFriend /> Přátelé
                        </p>
                      )}
                    </button>
                  </div>
                    <FriendOptions
                      onBlockUser={blockUser}
                      onRemoveFriend={removeFriend}
                      isFriend={relations.isFriend}
                    />
                  
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-blue-500">
          <a href={user && user.website}>{user && user.website}</a>
        </div>

        {location.pathname.includes("friends") ? (
          <Outlet context={{ user_id: user.id }} />
        ) : (
          <>
            <div className="w-full max-w-screen-sm px-4 mt-8">
              <h3 className="text-lg font-bold text-white">Zájmy</h3>

              <div className="flex flex-wrap gap-2 mt-4">
                {user.hobbies && user.hobbies ? (
                  user.hobbies.split(",").map((interest, index) => (
                    <Link
                      to={`/discover/users?selected_hobbies=${interest}`}
                      key={index}
                      className="px-4 py-2 text-sm text-white bg-purple-500 rounded-full shadow-md cursor-pointer hover:bg-purple-600"
                    >
                      {interest}
                    </Link>
                  ))
                ) : (
                  <p className="pl-10 text-gray-500">
                    Uživatel nezveřejnil žádné zájmy.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full max-w-screen-sm px-4 mt-6">
              <SavedStories isOwner={relations.isOwner} />
            </div>

            {user.id && (
              <div className="flex flex-col items-center w-1/2 mt-5">
                <SubNavigation
                  userId={user.id}
                  username={account_id!}
                  isOwner={relations.isOwner}
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

      <div className="flex items-center gap-4 p-5">
        {savedStories.map((storyId) => {
          const { id, url } = stories[storyId - 1];

          return (
            <button key={id} onClick={() => alert("příběh " + id)}>
              <div className="flex flex-col items-center">
                <div
                  style={{ backgroundImage: `url(${url})` }}
                  className="w-16 h-16 bg-center bg-cover rounded-full"
                ></div>
                <p className="mt-2 text-sm text-white">Nazev</p>
              </div>
            </button>
          );
        })}

        {isOwner && (
          <button onClick={() => saveAnotherStory()}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
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
    reCall: location.pathname,
  });

  const [activeTab, setActiveTab] = useState(activeSection.current || "posts");

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  const tabs = ["posts", "articles"];

  return (
    <>
      <div className="flex justify-center w-full gap-8 p-2 border-b border-gray-500">
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

      {!isFetching && (
        <div className="w-full mt-6">
          {activeTab === "posts" && (
            <section className="grid grid-cols-2 gap-5 p-5">
              {(() => {
                if (!posts.length)
                  return (
                    <p className="text-2xl text-gray-500 text-nowrap">
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
                      <p className="text-2xl text-gray-500 text-nowrap">
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
        </div>
      )}
    </>
  );
};

export default Profile;
