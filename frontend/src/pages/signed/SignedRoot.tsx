import React, { useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import MainNavBar from "../../components/MainNavBar";
import Aside from "../../components/Aside";
import { useDispatch } from "react-redux";
import { loadFriends, loadInvites, login } from "../../redux-store/auth";
import axiosInstance from "../../axios/instance";
import { userProps } from "../Profile";
import { socket } from "../../main";

const SignedRoot: React.FC = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState<userProps>({
    bio: "",
    email: "",
    id: 0,
    name: "",
    specific_id: "",
    status: "",
    username: "",
    website: "",
    hobbies : ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    axiosInstance
      .get("/verify")
      .then(async (response) => {
        if (response.data.error === "email_unverified") {
          const { email } = response.data;
          navigate("/login/verify/"+email);
        } else if (response.statusText === "OK") {
          setUserInfo(response.data);
          const { username, name, email, id, website, bio, hobbies, profile_picture , theme_picture } =
            response.data;
          dispatch(
            login({
              isAuth: true,
              credentials: { username, name, email },
              userInfo: { id, website, bio, hobbies , profile_picture , theme_picture },
            })
          );
          socket.emit("register", username);

          await axiosInstance
            .get(`users/${id}/friends`)
            .then((response) => {
              if (response.data) {
                const data = response.data;
                dispatch(loadFriends(data))
              }
            })
            .catch((err) => console.log(err));

          await axiosInstance
            .get("/friends/invitations?user_id=" + id)
            .then(({ data }) => {
              dispatch(loadInvites(data));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        if (!err.ok) {
          if (
            !["/login", "/signup"].some((href) =>
              location.pathname.includes(href)
            )
          ) {
            navigate("/");
          }
        }
      });
  }, []);

  const chat = location.pathname.includes("chat");

  const ASIDE_BANNED_PATHS = ["stories"];

  return (
    <section className="grid grid-cols-24">
      <MainNavBar />

      {userInfo.id !== 0 &&
        !ASIDE_BANNED_PATHS.some((bannedPath) =>
          window.location.pathname.includes(bannedPath)
        ) && (
          <div
            style={{ gridColumn: `span ${chat ? 1 : 4}` }}
            className={`h-screen sticky top-0 ${!chat && "-mt-16"}`}
          >
            <Aside username={userInfo && userInfo.username} />
          </div>
        )}
      <div style={{ gridColumn: `span ${chat ? 23 : 20}` }}>
        <Outlet />
      </div>
    </section>
  );
};

export default SignedRoot;
