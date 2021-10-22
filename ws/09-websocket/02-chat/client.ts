// import { readLines } from "https://deno.land/std/io/bufio.ts";
import { prompt } from "../prompt.ts";
import { WebSocket } from "https://deno.land/x/websocket@v0.0.5/mod.ts";

const endpoint = Deno.args[0] || "ws://127.0.0.1:8080";

const ws: WebSocket = new WebSocket(endpoint);
ws.on("open", async function() {
  console.log("ws connected! (type 'close' to quit)\n");
  while (true) {
    const line = await prompt("> ")
    if (line == 'close') break
    console.log("send : ", line);
    await ws.send(line);
  }
  ws.close()
});
ws.on("message", function (message: string) {
  console.log(`received: ${message}`);
});
