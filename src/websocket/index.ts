/**
 * @example
 * ```
 * await LunarSocket.build("ws://localhost:3005/socket");
 * LunarSocket.subscribeBoard("644e34aa2c1c44f3682d40b6");
 * ```
 * @export
 * @class LunarSocket
 * @extends {WebSocket}
 */
export class LunarSocket extends WebSocket {
  static shared: LunarSocket;

  static async build(url: string) {
    if (LunarSocket.shared) {
      LunarSocket.shared.close();
    }

    LunarSocket.shared = new LunarSocket(url);

    await new Promise((resolve) =>
      LunarSocket.shared.addEventListener("open", resolve)
    );
  }

  private constructor(url: string) {
    super(url);

    this.addEventListener("message", (event) => {
      try {
        this.handleMessage(JSON.parse(event.data));
      } catch (error) {
        console.log("message 錯誤:", event);
      }
    });

    this.addEventListener("close", (event) => {
      console.log("WebSocket 連接已經關閉:", event);
    });

    this.addEventListener("error", (event) => {
      console.log("WebSocket 錯誤:", event);
    });
  }

  private handleMessage(data: { type: "update" | "success"; result: any }) {
    // TODO: 實作更新 store
    console.log("please update store", data);
  }

  public subscribeBoard(boardId: string) {
    const message = {
      type: "subscribe",
      boardId: boardId,
    };

    this.send(JSON.stringify(message));
  }
}
