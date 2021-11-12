import { WebSocket, WebSocketServer } from "https://deno.land/x/websocket@v0.0.5/mod.ts";

const wss = new WebSocketServer();
wss.on("connection", function (ws: WebSocket) {    //只要有人連進來 就執行 :
  console.log("socket connected!");   //(socket很多語言都有這函式庫，作網路訊息傳遞通常會用)
  ws.on("message", function (message: string) {
    console.log(message);
    ws.send(message)  //傳回client?
  });
});
//要先執行server


//可以寫桌面端的...?
