//網頁訪問計數器
//針對不同人分別計算   不同於放到後端來計數
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";     //deno此套件無人維護了，等等會壞  要用別人的session(ex : oak_session) 在老師更新的專案內

const app = new Application();

//* Configuring Session for the Oak framework
const session = new Session({ framework: "oak" });
await session.init();

// Adding the Session middleware. Now every context will include a property
// called session that you can use the get and set functions on
app.use(session.use()(session));   //app.use使用session  官網說要session.use()(session)這樣寫  session.use可以傳回一個function 然後把session變數傳入那個套件  ccc說是奇怪的寫法


// Creating a Router and using the session
const router = new Router();

router.get("/", async (context) => {

    // Examples of getting and setting variables on a session
    if (await context.state.session.get("pageCount") === undefined) {                   //可以設很多個
        await context.state.session.set("pageCount", 0);

    } else {
        await context.state.session.set("pageCount", await context.state.session.get("pageCount") + 1); //紀錄
    }
    
    context.response.body = `Visited page ${await context.state.session.get("pageCount")} times`;    //用get取得你用session設的哪個函數
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });