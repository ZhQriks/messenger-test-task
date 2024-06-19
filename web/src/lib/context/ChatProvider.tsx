import { fetchChat, sendFileMessage, sendTextMessage } from "@/services/chat";
import socket from "@/services/socket";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface Chat {
  _id: string;
  roomId: string;
  name: string;
  members: string[];
}

interface ChatContextType {
  chat: Chat | null;
  messages: Message[];
  joinChat: (chatId: string) => Promise<void>;
  leaveChat: (chatId: string) => void;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  sendFile: (chatId: string, file: File) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("MESSAGE", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("MESSAGE");
    };
  }, []);

  const joinChat = async (chatId: string) => {
    const { data } = await fetchChat(chatId);
    setChat(data);
    setMessages(data.messages);

    socket.emit("JOIN_CHAT", { chatId });
  };

  const leaveChat = (chatId: string) => {
    socket.emit("LEAVE_CHAT", { chatId });
    setChat(null);
    setMessages([]);
  };

  const sendMessage = async (chatId: string, text: string) => {
    await sendTextMessage(chatId, text);
  };

  const sendFile = async (chatId: string, file: File) => {
    await sendFileMessage(chatId, file);
  };

  return (
    <ChatContext.Provider
      value={{ chat, messages, joinChat, leaveChat, sendMessage, sendFile }}
    >
      {children}
    </ChatContext.Provider>
  );
};
