import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/hooks";
import { SocketMessageProps, SocketResultProps } from "@/interfaces/socket";
import { selectWebsocketUrl } from "@/redux/userSlice";

type WebSocketContextProps = [
  data: SocketResultProps | undefined,
  sendMessage: (message: SocketMessageProps) => void
];

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const url = useAppSelector(selectWebsocketUrl);
  const ws = useRef<WebSocket | null>(null);
  const [connect, setConnect] = useState(false);
  const [data, setData] = useState<SocketResultProps>();

  useEffect(() => {
    // 創建WebSocket連接
    ws.current = new WebSocket(url);
    // 在連接建立時執行的邏輯
    ws.current.addEventListener("open", () => {
      setConnect(true);
    });
    ws.current.addEventListener("error", (err) => {
      setConnect(false);
      console.error(err);
    });
    ws.current.addEventListener("close", (event) => {
      setConnect(false);
      console.log(event);
    });
    // 在接收到消息時執行的邏輯
    ws.current.addEventListener("message", (event) => {
      const evenData = JSON.parse(event.data);
      if (evenData.type === "update") {
        setData(evenData.result);
      }
    });
    // 在組件卸載時關閉WebSocket連接
    return () => {
      if (ws.current && connect) {
        ws.current.close();
      }
    };
  }, []);

  // 向WebSocket服務器發送消息的函數
  const sendMessage = (message: SocketMessageProps) => {
    if (ws.current && connect) {
      ws.current.send(JSON.stringify(message));
    }
    // 看板切換時，要清空舊資料
    if (message.type === "unsubscribe") {
      setData(undefined);
    }
  };

  return (
    <WebSocketContext.Provider value={[data, sendMessage]}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
