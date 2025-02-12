import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";

import { FaCheck } from "react-icons/fa";
import { IoMdClose as FaTimes } from "react-icons/io";

import { formatDistanceToNow } from "date-fns";
import { cs } from "date-fns/locale";

import LogoImage from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-store";
import axiosInstance from "../../axios/instance";
import { useNavigate } from "react-router-dom";
import { clearInvite } from "../../redux-store/auth";

interface InvitationProps {
  created_at: string;
  sender_email: string;
  sender_id: number;
  sender_name: string;
  sender_profile_picture: string;
  sender_username: string;
  id: number;
}

const Invitation: React.FC<InvitationProps> = ({
  created_at,
  sender_email,
  sender_name,
  sender_profile_picture,
  sender_id,
  sender_username,
  id,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector<RootState>((state) => state.auth.userInfo?.id);
  const { setToastInfo } = useContext(AppContext);

  const onAccept = () => {
    if (userId) {
      axiosInstance
        .post("/friends/accept", { user_id_1: sender_id, user_id_2: userId })
        .then(({ data }) => {
          if (!data.error) {
            setToastInfo(
              `Od teď jste s uživatelem ${sender_name} přátelé.`,
              "success"
            );
            navigate("/profile/" + sender_username);
            dispatch(clearInvite(id));
          } else {
            setToastInfo(
              `Pozvánka mezi vámi a uživatelem ${sender_name} neexistuje.`,
              "error"
            );
          }
        });
    }
  };

  const onReject = () => {
    if (userId) {
      axiosInstance
        .post("/friends/refuse", { user_id_1: sender_id, user_id_2: userId })
        .then(({ data }) => {
          if (!data.error) {
            setToastInfo(
              `Zamítli jste přátelství s uživatelem ${sender_name}`,
              "success"
            );
            dispatch(clearInvite(id));
          } else {
            setToastInfo(
              `Pozvánka mezi vámi a uživatelem ${sender_name} neexistuje.`,
              "error"
            );
          }
        });
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 shadow-md border border-gray-200 rounded-lg bg-white my-2">
      <img
        src={sender_profile_picture || LogoImage}
        alt={sender_name}
        className="w-12 h-12 rounded-full border border-gray-300 object-cover"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{sender_name}</p>
          <p className="text-xs">@{sender_username}</p>
        </div>
        <a href={`mailto:${sender_email}`} className="text-xs text-blue-500">{sender_email}</a>
        <p className="text-xs text-gray-400">
          {formatDistanceToNow(new Date(created_at), {
            addSuffix: true,
            locale: cs,
          })}
        </p>
      </div>

      <div className="flex gap-5">
        <button
          onClick={onAccept}
        >
          <FaCheck size={25} className="text-purple-400" />
        </button>
        <button
          onClick={onReject}
        >
          <FaTimes size={35} className="text-purple-600" />
        </button>
      </div>
    </div>
  );
};

export default Invitation;
