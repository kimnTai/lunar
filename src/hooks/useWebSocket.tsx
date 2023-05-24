import { useEffect, useRef, useState } from "react";

const useWebSocket = (
  boardId: string,
  onUpdate: (id: string) => Promise<void>
) => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [connect, setConnect] = useState(false);
  const [data, setData] = useState<any>({ lists: [] });
  useEffect(() => {
    // 創建WebSocket連接
    webSocketRef.current = new WebSocket(
      //   "wss://prometheus-pmcy.onrender.com/socket"
      "ws://localhost:3005/socket"
    );

    // 在連接建立時執行的邏輯
    webSocketRef.current.onopen = () => {
      console.log("WebSocket連接已建立");
      // 在連接建立後，發送訂閱消息
      setConnect(true);
      sendMessage({ type: "subscribe", boardId: boardId });
    };
    webSocketRef.current.onerror = () => {
      console.log("WebSocket 錯誤");
    };

    webSocketRef.current.onclose = () => {
      console.log("websocket 關閉");
    };
    // 在接收到消息時執行的邏輯
    webSocketRef.current.onmessage = (event) => {
      console.log("===websocket event===", event);
      //   const message = JSON.parse(event.data);
      //   if (message.type === "update") {
      //     const newData = message.data;
      //     setData(newData);
      //     onUpdate(newData);
      //   }
    };

    // 在組件卸載時關閉WebSocket連接
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [boardId]);

  // 向WebSocket服務器發送消息的函數
  const sendMessage = (message: any) => {
    if (webSocketRef.current && connect) {
      webSocketRef.current.send(JSON.stringify(message));
    }
  };

  return { data, sendMessage };
};

export default useWebSocket;
