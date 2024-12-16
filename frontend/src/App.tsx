import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignedRoot from "./pages/signed/SignedRoot.tsx";
import UnSignedRoot from "./pages/unsigned/UnSignedRoot.tsx";

import Signup, { loader as SignUpLoader } from "./pages/SignUp.tsx";

import SignedHome from "./pages/signed/HomePage.tsx";
import UnSignedHome from "./pages/unsigned/HomePage.tsx";

import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./pages/Login.tsx";
import MoreInfoPage from "./pages/About.tsx";
import Profile from "./pages/Profile.tsx";
import Friends from "./pages/Friends.tsx";
import StoryPreview from "./pages/StoryPreviews.tsx";
import DirectChat from "./pages/chat/DirectChat.tsx";
import IndexChat from "./pages/chat/Index.tsx";

import Menu from "./pages/chat/Menu.tsx";
import OrgChat from "./pages/chat/OrgChat.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import DiscoverUsers from "./pages/DiscoverUsers.tsx";
import Notifications from "./pages/Notifications.tsx";
import PostPage from "./pages/PostPage.tsx";
import Article from "./pages/ArticlePage.tsx";
import CreateArticle from "./pages/CreateArticle.tsx";
import AccountSettings from "./components/AccountSettings.tsx";

const signedRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <SignedRoot />,
    children: [
      {
        index: true,
        element: <SignedHome />,
      },
      {
        path: "profile/:account_id",
        element: <Profile />,
        children: [
          {
            path: "friends",
            element: <Friends />,
          },
        ],
      },
      {
        path: "stories/:id",
        element: <StoryPreview />,
      },
      {
        path: "chat",
        element: <IndexChat />,
        children: [
          {
            path: "@me",
            element: <Menu variant="direct" />,
            children: [
              {
                path: ":friend_id",
                element: <DirectChat />,
              },
            ],
          },
          {
            path: ":org_id",
            element: <Menu variant="org" />,
            children: [
              {
                path: ":channel_id",
                element: <OrgChat />,
              },
            ],
          },
        ],
      },
      {
        path: "create",
        children: [
          {
            index: true,
            element: <CreatePage />,
          },
          {
            path: "post",
            element: <CreatePost />,
          },
          {
            path: "article",
            element: <CreateArticle />,
          },
        ],
      },
      {
        path: "discover",
        children: [
          {
            path: "users",
            element: <DiscoverUsers />,
          },
        ],
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/post/:post_id",
        element: <PostPage />,
      },
      {
        path: "/article/:article_id",
        element: <Article />,
      },
      {
        path: "settings",
        element: <AccountSettings onClose={() => {}} />,
      },
    ],
  },
]);

const unSignedRouter = createBrowserRouter([
  {
    path: "/",
    element: <UnSignedRoot />,
    children: [
      {
        index : true,
        element : <UnSignedHome />
      },
      {
        path: "signup",
        element: <Signup />,
        loader: SignUpLoader,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <MoreInfoPage />,
      },
    ],
  }
]);

const App: React.FC = () => {
  const auth = useRef(import.meta.env.VITE_AUTH);

  if(auth.current !== "yes" && auth.current !== "no"){ 
    return (
      <section className="h-screen w-scre flex flex-col items-center justify-center gap-10">
        <h1 className="text-4xl text-white">"{auth.current}" je neplatná hodnota pro VITE_AUTH</h1>
        <p className="text-gray-400 text-2xl">V Souboru /.env změňte hodnotu VITE_AUTH na
          <ul>
            <li>
              <h1>YES</h1>
              <p className="text-lg">Zobrazí se UI pro přihlášeného uživatele</p>
            </li>
            <li>
              <h1>NO</h1>
              <p className="text-lg">Zobrazí se UI pro nepřihlášeného uživatele</p>
            </li>
          </ul>
        </p>
      </section>
    )
  }

  return (
    <>
      <RouterProvider
        router={auth.current === "yes" ? signedRouter : unSignedRouter}
      ></RouterProvider>
    </>
  );
};

export default App;
