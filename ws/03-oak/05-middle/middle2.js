import { Application } from "https://deno.land/x/oak/mod.ts";  //在寫中間件

const app = new Application();

// Logger
app.use(async (ctx, next) => {    //一定要有async，因為裡面有await，非同步輸出入
  await next();                 //await先讓給下一個中間件可以執行，next():又繼續回來執行
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`); //rt是反應時間 
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('start=', start)
  await next();
  const stop = Date.now();
  console.log('stop=', stop)
  const ms = stop - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);  /*把經過的時間記錄下來 */
});

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
