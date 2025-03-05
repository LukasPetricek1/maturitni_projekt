import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignedRoot from "./pages/signed/SignedRoot.tsx";

import SignedHome from "./pages/signed/HomePage.tsx";

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
import ProtectedRoute from "./ProtectedRoute.tsx";
import Verify from "./pages/Verify.tsx";
import Toast from "./components/Toast.tsx";

import { AppContext } from "./Context/AppContext.tsx";
import CreateOrganization from "./pages/chat/CreateOrganization.tsx";
import { onLike } from "./utils/functions/onLike.ts";
import { SocketProvider } from "./Context/SocketContext.tsx";
import Organizations from "./pages/chat/Organizations.tsx";

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
            path: "create_organization",
            element: <CreateOrganization />,
          },
          {
            path: "org",
            element : <Organizations />
          },
        {
          path : "org",
          children : [
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
          ]
        }
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
        element: <PostPage />
      },
      {
        path: "/article/:article_id",
        element: <Article />,
      },
      {
        path: "signup",
        element: (
          <ProtectedRoute>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "login/verify/:email",
        element: <Verify />,
      },
      {
        path: "about",
        element: <MoreInfoPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const [toastInfo, setToastInfo] = useState({
    message: "",
    type: "",
  });

  const closeToast = () => {
    setToastInfo({
      message: "",
      type: "",
    });
  };

  return (
    <SocketProvider>
      <AppContext.Provider
        value={{
          setToastInfo: (message: string, type: string) =>
            setToastInfo({ message, type }),
            toastMessage: toastInfo.message,
            onLike : onLike
        }}
      >
        {toastInfo.message && toastInfo.type && (
          <Toast
            message={toastInfo.message}
            type={toastInfo.type}
            onClose={closeToast}
          />
        )}
        <RouterProvider router={signedRouter}></RouterProvider>
      </AppContext.Provider>
    </SocketProvider>
  );
};

export default App;
