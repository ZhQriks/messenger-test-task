import React from "react";
import Avatar from "./avatar";

interface MessageProps {
  message: string;
  isSentByCurrentUser: boolean;
  time: string;
}
const Message = ({ message, isSentByCurrentUser, time }) => (
  <div
    className={`flex items-start gap-3 ${isSentByCurrentUser ? "justify-end" : ""}`}
  >
    <div
      className={`rounded-lg p-3 max-w-[70%] ${isSentByCurrentUser ? "bg-purple-500 text-white" : "bg-gray-100"}`}
    >
      <div className="text-sm">{message}</div>
      <p
        className={` text-xs ${isSentByCurrentUser ? "text-gray-200" : "text-gray-500"}`}
      >
        {time}
      </p>
    </div>
  </div>
);

export default Message;
