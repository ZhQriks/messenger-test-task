import { UserData } from "@/lib/auth/auth.types";
import { IMessage } from "@/lib/types/message";
import { BACKEND_URL } from "@/shared";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SendMessagePayload {
    email: string;
    message: string;
    senderId: string;
    receiverId: string;
}

interface handleTypingPayload {
    userId: string;
}

interface ChatSubscriptionProps {
  user: UserData;
  socket: Socket<any>;
  receiverId?: string;
}

const useChatSubscription = ({user, socket, receiverId}: ChatSubscriptionProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const { _id: userId, email } = user.user;

  useEffect(() => {
    if (receiverId) {
      const roomId = [receiverId, userId].sort().join("-");
      setRoomId(roomId);
    }
  }, [receiverId]);

  const handleTyping = (payload: handleTypingPayload) => {
    socket.emit("typing", { roomId, nowId: payload.userId });
  };

  const sendMessage = (payload: SendMessagePayload) => {
      socket.emit("send_message", {
        text: payload.message,
        roomId: roomId,
        senderId: payload.senderId,
        username: payload.email,
        receiverId: payload.receiverId,
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (roomId) {
        const response = await fetch(`${BACKEND_URL}/messages/${roomId}`);
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    const handleReceiveMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    if (socket && roomId) {
      socket.emit("join_room", roomId);
      socket.on("receive_message", handleReceiveMessage);
      socket.on("user_typing", () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      });

      return () => {
        socket.off("receive_message", handleReceiveMessage);
        socket.off("user_typing");
      };
    }
  }, [socket, roomId]);

  return {
    messages,
    isTyping,
    roomId,
    handleTyping,
    sendMessage,
  };
};

export default useChatSubscription;