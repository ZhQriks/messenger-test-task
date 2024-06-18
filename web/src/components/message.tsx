import React from "react";
import Avatar from "./avatar";

const Message = ({ user, message, isSentByCurrentUser }) => (
  <div
    className={`flex items-start gap-3 ${isSentByCurrentUser ? "justify-end" : ""}`}
  >
    <div
      className={`rounded-lg p-3 max-w-[70%] ${isSentByCurrentUser ? "bg-purple-500 text-white" : "bg-gray-100"}`}
    >
      <div className="text-sm">{message}</div>
    </div>
  </div>
);

export default Message;
