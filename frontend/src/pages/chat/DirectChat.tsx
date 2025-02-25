import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { differenceInMinutes} from "date-fns";

import { FaEllipsisH} from "react-icons/fa";

import axiosInstance from "../../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";
import { useSocket } from "../../Context/SocketContext";
import ChatMessage from "../../components/chat/Message";
import MediaUploadMenu from "../../components/chat/MediaUploadMenu";
import TypingIndicator from "../../components/chat/TypingIndicator";

export interface MessageProps {
  channels_id: number;
  content: string;
  created_at: string;
  id: number;
  status: "read" | "unread";
  user_id: number;
  updated_at? : string;
  removed : number
}

const DirectChat: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [channelId, setChannelId] = useState<number | null>();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { socket } = useSocket();
  const [someoneIsTyping, setSomeoneIsTyping] = useState<string>("")

  const { friend_id: friend_username } = useParams();
  const user_username = useSelector<RootState>(
    (state) => state.auth.credentials?.username
  );
  const user_id = useSelector<RootState>((state) => state.auth.userInfo?.id);
  const friendID = useSelector<RootState>(
    (state) =>
      state.auth.channels?.filter((chat) => chat.name === friend_username)[0].id
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, someoneIsTyping]);

  useLayoutEffect(() => {
    if (channelId) socket!.emit("direct-chat/join-channel", channelId);
    async function getChannelInfo() {
      try {
        const { data: channel_is_exists } = await axiosInstance.post(
          "/direct-chat/channel-exists",
          {
            username_1: user_username,
            username_2: friend_username,
          }
        );
        if (channel_is_exists.id) {
          const id = channel_is_exists.id;
          setChannelId(id);

          const response = await axiosInstance.get(
            "/direct-chat/messages?channel_id=" + id
          );
          setMessages(response.data);
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }

    getChannelInfo();

    return () => {
      if (channelId) socket!.emit("direct-chat/leave-channel", channelId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, friend_username, user_username]);

  useEffect(() => {
    if (socket) {
      socket.on("direct-chat/new-message", (data) => {
        console.log(data);
        setMessages((prev) => [...prev, ...data]);
      });


      socket.on("direct-chat/typing" , data => { 
        if(data !== user_username) setSomeoneIsTyping(data)
      })

      socket.on("direct-chat/stop-typing" , () => { 
        setSomeoneIsTyping("")
      })
    }
  }, [socket]);

  async function saveMessage(msg: string) {
    const response = await axiosInstance.post("/direct-chat/save-message", {
      content: msg,
      channel_id: channelId,
      user_id: user_id,
    });
    const message = response.data[1];
    socket!.emit("direct-chat/new-message", {
      channel: channelId,
      msg: message,
    });
  }

  const clearUserInput = () => {
    setMessage("");
  };

  const sendMessage = async (msg: string) => {
    try {
      if (!channelId) {
        const channel_name = `@${user_username}-${friend_username}`;
        const { data } = await axiosInstance.post(
          "/direct-chat/create-channel",
          { channel_name: channel_name }
        );
        if (data && user_id && friendID && data.channel_id) {
          await axiosInstance.post("/direct-chat/connect-users", {
            user_id_1: user_id,
            user_id_2: friendID,
            channel_id: data.channel_id,
          });

          saveMessage(msg);
        }
      } else {
        saveMessage(msg);
      }
    } catch (err) {
      console.log(err);
    }

    clearUserInput();

  };

  const checkMessage = () => {
    const trimmedMsg = message.trim();
    if (trimmedMsg.length > 0) {
      sendMessage(message);
    }
  };

  const handleKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur()
      checkMessage();
    }
  };

  const updateMessage = async (id : number, content : string) => { 

    try{ 
      const { data } = await axiosInstance.post("/direct-chat/update-message" , { message_id : id, content : content})
      console.log(data)
      if(data[0].affectedRows){ 
        const newMessages = messages.map((message : MessageProps) => { 
          if(message.id === id){ 
            message.content = content
            message.updated_at = data[1][0].updated_at
          }
          return message
        })
        setMessages(newMessages)
      }
    }catch(err){
      console.log(err)
    }
  }

  const deleteMessage = (id : number) => { 
    const newMessages = messages.map(( message : MessageProps) => {
      if(message.id === id){ 
        message.removed = 1
      }
      return message
    })
    setMessages(newMessages)
  }
 
  const writeMessage = (msg : string) => { 
    if(msg.trim().length > 0){ 
      socket?.emit("direct-chat/typing" , { channel_id : channelId , username : user_username})
    }
    setMessage(msg)
  }

  const handleBlur = () => { 
    socket?.emit("direct-chat/stop-typing" , { channel_id : channelId , username : user_username})
  }

  return (
    <>
      <div className="flex flex-col flex-1 bg-gray-700/40">
        <header className="flex items-center justify-between h-16 px-4 bg-purple-900 border-b border-gray-400">
          <h1 className="text-lg font-semibold">@{friend_username}</h1>
          <FaEllipsisH className="text-white cursor-pointer" />
        </header>

        <div className="flex-1 p-6 m-6 overflow-y-scroll scroll-smooth">
          <div className="mb-4 text-center">
            <h2 className="text-lg font-semibold text-gray-300">
              Počátek chatu s @{friend_username}
            </h2>
            <p className="text-sm text-gray-400">Počátek všeho úžasného</p>
          </div>
          <div className="flex flex-col items-center h-full gap-2 pt-10">
            {messages.length > 0 && (
              <>
                {messages.map((message, index) => {
                  const showTimestamp =
                  index === 0 ||
                  differenceInMinutes(
                    new Date(message.created_at),
                    new Date(messages[index - 1].created_at)
                  ) >= 15;

                  return (
                    <ChatMessage message={message} deleteMessage={deleteMessage} updateMessage={updateMessage} user_id={user_id} showTimestamp={showTimestamp}  />
                  )
                })}

                <div ref={messagesEndRef}></div>
                {someoneIsTyping && <TypingIndicator who={someoneIsTyping} />}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center h-16 gap-2 px-4 bg-gray-200 border-t border-gray-400">
          <MediaUploadMenu />
          <input
            type="text"
            placeholder="Napište zprávu ..."
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={message}
            onChange={(e) => writeMessage(e.target.value)}
            onKeyDown={handleKeyboard}
            onBlur={handleBlur}
          />
        </div>

      </div>
    </>
  );
};

export default DirectChat;
