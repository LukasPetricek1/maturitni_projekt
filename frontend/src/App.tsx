import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignedRoot from "./pages/signed/SignedRoot.tsx";

import SignedHome  from "./pages/signed/HomePage.tsx";

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

import Signup from "./pages/SignUp.tsx";
import profileLoader from "./loaders/ProfileLoader.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Verify from "./pages/Verify.tsx";

const signedRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <SignedRoot />,
    children: [
      {
        index: true,
        element: <SignedHome />
      },
      {
        path: "profile/:account_id",
        element: <Profile />,
        // loader : profileLoader,
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
        path: "signup",
        element: <ProtectedRoute><Signup /></ProtectedRoute>
      },
      {
        path: "login",
        element: <ProtectedRoute><Login /></ProtectedRoute>,
      },
      {
        path : "login/verify/:email",
        element : <Verify />
      },
      {
        path: "about",
        element: <MoreInfoPage />,
      },
    ],
  },
]);


const App: React.FC = () => {

  return (
    <>
      <RouterProvider
        router={signedRouter}
      >
      </RouterProvider>
    </>
  );
};

export default App;
