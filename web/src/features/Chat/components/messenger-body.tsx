import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/avatar";
import Message from "@/components/message";
import { useAuth } from "@/lib/hooks/useAuth";
import { useParams } from "react-router-dom";
import ChatInput from "./chat-input";
import useChatSubscription from "@/lib/hooks/chat/useChatSubscription";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/lib/context/socket-provider";
import { MessageSquarePlus } from "lucide-react";
import ChatPlaceHolder from "@/components/chat-placeholder";
import useUser from "@/lib/hooks/users/userUser";
import { formatTime } from "@/lib/utils";

const MessengerBody: React.FC = () => {
  const { receiverId } = useParams();
  const { user } = useAuth();
  const socket = useSocket();
  const { data: receiver } = useUser(receiverId);

  const bottomOfMessagesRef = useRef<any>();

  const { messages, isTyping } = useChatSubscription({
    user,
    socket,
    receiverId,
  });

  useEffect(() => {
    if (messages && receiverId) {
      bottomOfMessagesRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  if (!receiverId) {
    return <ChatPlaceHolder />;
  }

  return (
    <>
      <div className="border-b border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={receiver?.email.slice(0, 2).toUpperCase()} />
          <div>
            <div className="font-medium">{receiver?.email}</div>
            <div className="text-sm text-gray-500">
              {isTyping ? "Typing..." : "Say HII"}
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {messages.map((msg, key) => (
            <Message
              key={msg._id || key}
              time={formatTime(msg.createdAt)}
              message={msg.text}
              isSentByCurrentUser={msg.username == user.user.email}
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
