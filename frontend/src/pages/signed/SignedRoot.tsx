import React, { useLayoutEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import MainNavBar from "../../components/MainNavBar";
import Aside from "../../components/Aside";
import { useDispatch } from "react-redux";
import { login } from "../../redux-store/auth";
import axiosInstance from "../../axios/instance";
import { userProps } from "../Profile";
import SignedHome from "./HomePage";
import UnSignedHome from "../unsigned/HomePage";
import { socket } from "../../main";
// import { login } from "../../redux-store/auth";

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
  });
  // const loader = useLoaderData() as authProps || { err : string };

  // useEffect(() => {
  //   if(loader.err){

  //   }else{
  //     dispatch(login(loader))
  //   }
  // } , [dispatch, loader])

  // const loader = useLoaderData() as authProps;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    axiosInstance
      .get("/verify")
      .then((response) => {
        if (response.statusText === "OK") {
          setUserInfo(response.data);
          const { username, name, email, id, website, bio } = response.data;
          dispatch(
            login({
              isAuth : true,
              credentials: { username, name, email },
              userInfo: { id, website, bio, hobbies: [] },
            })
          );
          socket.emit("register" , username)
        }
      })
      .catch((err) => {
        if (!err.ok) {
          if(!["/login" , "/signup"].some(href => location.pathname.includes(href))){
            navigate("/");
          }
        }
      });
    // console.log(loader)
    // if((loader as AxiosError).isAxiosError){
    //   console.log("unloged")
    //   setLogged(false)
    // }else{
    //   setLogged(true)
    //   dispatch(login(loader))
    // }
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
