import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/avatar";
import Message from "@/components/message";
import { useSocket } from "@/lib/context/socket-context";
import { useAuth } from "@/lib/hooks/useAuth";
import { useParams } from "react-router-dom";
import ChatInput from "./chat-input";
import useChatSubscription from "@/lib/hooks/chat/useChatSubscription";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessengerBody: React.FC = () => {
  const { chatId } = useParams();
  const { user } = useAuth();
  const socket = useSocket();

  const bottomOfMessagesRef = useRef<any>();

  const { messages, isTyping, chatPartnerName, receiverId } = useChatSubscription(
    user,
    socket,
    chatId
  );

  useEffect(() => {
    bottomOfMessagesRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="border-b border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar src="/placeholder-user.jpg" fallback="JD" />
          <div>
            <div className="font-medium">{chatPartnerName}</div>
            <div className="text-sm text-gray-500">
              {isTyping ? "Typing..." : "Online"}
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {messages.map((msg) => (
            <Message
              key={msg._id || msg.text}
              user={msg.user}
              message={msg.text}
              isSentByCurrentUser={msg.username == user.email}
            />
          ))}
          <div ref={bottomOfMessagesRef}></div>
        </div>
      </ScrollArea>

      <ChatInput receiverId={receiverId} />
    </>
  );
};

export default MessengerBody;
