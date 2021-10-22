import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

var count = 0;
function hello(aaa) {
  console.log(++count, "times hello executed!");
  console.log('href=', aaa.request.url.href)
  aaa.response.body = "Hello World!";
}

app.use(hello);

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
