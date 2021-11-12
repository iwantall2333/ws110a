import { Application, send } from "https://deno.land/x/oak/mod.ts";
import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

// html serve
const app = new Application();

app.use(async (ctx) => {
  console.log('path=', ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/`,
    index: "index.html",
  });
});

// websocket serve
const wss = new WebSocketServer(8080);

wss.on("connection", function (wsc: WebSocketClient) {
	wsc.on("message", function (message: string) {
		console.log(message);
		//ws.send(message);
		// broadcast message
		wss.clients.forEach(function each(client) {
			if (!client.isClosed) {
				client.send(message);
			}
		});
	});
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

//這裡的回呼函數 任何人送訊息給我 他都會廣播出去給所有人//(ws: WebSocket)是型態描述