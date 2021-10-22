// app.ts
import { Application, Router } from "https://deno.land/x/oak@v6.0.0/mod.ts";
import {
  viewEngine,
  engineFactory,
  adapterFactory,
} from "https://ccc-js.github.io/view-engine/mod.ts";

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

const app = new Application();
const router = new Router();

router.get('/', async (ctx, next) => {
  console.log('root:/')
  ctx.render("index.ejs", { data: { name: "John" } });  //render會直接呈現在網頁上
})

app.use(viewEngine(oakAdapter, ejsEngine));  //使用ejs模板引擎   所以17的render 會將index.ejs 與 後面的參數結合 然後 選擇使用ejs引擎合在一起 //使用不同引擎顯示的方式就會長不一樣?
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
