import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
} from "react";
import SockerIOClient, { Socket } from "socket.io-client";

export interface ContextValue {
  socket?: typeof Socket;
}

export const Context = React.createContext<ContextValue>({} as ContextValue);

const defaultInitialData = {
};

export const Provider: FunctionComponent = (props) => {
  const { children } = props;
  const [socket, setSocket] = useState<typeof Socket | undefined>();
  const [isConnected, setIsConnected] = useState(false);
  const [isInitialyConnected, setIsInitialyConnected] = useState(false);
  const [initialData, setInitialData] = useState<any>(defaultInitialData);
  const [isEnded, setIsEnded] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(false);

  const connect = async () => {
    if (isInitialyConnected) {
      return;
    }

    const socket = SockerIOClient("http://localhost:3001", { transports: ["websocket"], forceNew: true });
    socket.on("connect", () => {
      console.log("Initial connect to conference server");
      setSocket(socket);
      setIsInitialyConnected(true);
    });

    socket.on("conference:ended", (by: any) => {
      socket.removeAllListeners();
      socket.disconnect();
      setSocket(undefined);
      if (by?.reason?.length) {
        setIsTimeOver(true);
      } else {
        setIsEnded(true);
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from conference server");
      setIsDisconnected(true);
      disconnect()
    });

    socket.on("reconnect", () => {
      console.log("Reconnected to conference server");
      setIsDisconnected(false);
    });
  };

  const disconnect = useCallback(async () => {
    if (!socket) {
      return;
    }
    socket.removeAllListeners();
    socket.disconnect();
    setSocket(undefined);
  }, [socket]);

  useEffect(() => { 
    if (!socket) {
      connect();
    }
  }, [socket]);
  
  return (
    <Context.Provider
      value={{
        socket,
      }}
    >
      {children}
    </Context.Provider>
  );
};
