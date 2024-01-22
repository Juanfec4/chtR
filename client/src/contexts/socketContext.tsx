import { FC, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SocketContextProps } from "../@types/props";

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: FC<SocketContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || "");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};
