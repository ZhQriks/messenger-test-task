import { UserData } from "@/lib/auth/auth.types";
import { IMessage } from "@/lib/types/message";
import { MessengerType } from "@/lib/types/messenger";
import { fetchMessages } from "@/services/chat";
import socket from "@/services/socket";
import { useEffect, useState } from "react";

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
  receiverId?: string;
}

const useChatSubscription = ({user, receiverId}: ChatSubscriptionProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const { _id: userId } = user.user;

  useEffect(() => {
    if (receiverId) {
      const roomId = [receiverId, userId].sort().join("-");
      setRoomId(roomId);
    }
  }, [receiverId]);

  const handleTyping = (payload: handleTypingPayload) => {
    socket.emit(MessengerType.TYPING, { roomId, nowId: payload.userId });
  };

  const sendMessage = (payload: SendMessagePayload) => {
      socket.emit(MessengerType.SEND_MESSAGE, {
        text: payload.message,
        roomId: roomId,
        senderId: payload.senderId,
        username: payload.email,
        receiverId: payload.receiverId,
    });
    
  };

  useEffect(() => {
    const getMessages = async () => {
      if (roomId) {
        const messages = await fetchMessages(roomId);
        setMessages(messages.data);
      }
    };

    getMessages();
  }, [roomId]);

  useEffect(() => {
    const handleReceiveMessage = (message: IMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    if (socket && roomId) {
      socket.emit(MessengerType.JOIN_ROOM, roomId);
      socket.on(MessengerType.RECEIVE_MESSAGE, handleReceiveMessage);
      socket.on(MessengerType.USER_TYPING, () => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      });

      return () => {
        socket.off(MessengerType.RECEIVE_MESSAGE, handleReceiveMessage);
        socket.off(MessengerType.USER_TYPING);
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