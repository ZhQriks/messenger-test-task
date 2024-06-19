import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  const userId = user?.user._id;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newSocket = io("http://localhost:3000", {
        autoConnect: true,
        query: { userId },
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
