import { UserData } from "@/lib/auth/auth.types";
import { IMessage } from "@/lib/types/message";
import { BACKEND_URL } from "@/services";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SendMessagePayload {
    email: string;
    message: string;
    receiverId: string;
    senderId: string;
}

interface handleTypingPayload {
    receiverId: string;
    userId: string;
}

const useChatSubscription = (user: UserData, socket: Socket<any>, chatId?: string) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [chatPartnerName, setChatPartnerName] = useState<string>("Loading...");

  const { _id: userId, email } = user;

  useEffect(() => {
    if (chatId) {
      const receiverId = [chatId, userId].sort().join("-");
      setReceiverId(receiverId);
      fetchUser(chatId);
    }
  }, [chatId]);

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${userId}`);
      const data: UserData = await response.json();
      if (data.email) {
        setChatPartnerName(data.email);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleTyping = (payload: handleTypingPayload) => {
    console.log('I am typing');
    socket.emit("typing", { receiverId: payload.receiverId, nowId: payload.userId });
  };

  const sendMessage = (payload: SendMessagePayload) => {
      socket.emit("send_message", {
        text: payload.message,
        receiverId: payload.receiverId,
        username: payload.email,
        senderId: payload.senderId,
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiverId) {
        const response = await fetch(`${BACKEND_URL}/messages/${receiverId}`);
        const data = await response.json();
        setMessages(data);
      }
    };

    fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    const handleReceiveMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    if (socket && receiverId) {
      socket.emit("join_room", receiverId);
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
  }, [socket, receiverId]);

  return {
    messages,
    isTyping,
    chatPartnerName,
    receiverId,
    handleTyping,
    sendMessage,
  };
};

export default useChatSubscription;
