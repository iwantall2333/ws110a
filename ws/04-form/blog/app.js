import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'

const posts = [
  {id:0, title:'aaa', body:'aaaaa'},  //一維array
  {id:1, title:'bbb', body:'bbbbb'}
];

const router = new Router();

router.get('/', list)  //
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {   //顯示其中一項
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()  //newpost點擊Create後先取得body內容
  console.log('here!!!',body.type,'gere2',body.value)
  if (body.type === "form") {             /*.type可能是JSON，尋找裡面是否有form*/
    const pairs = await body.value    //value難道指所有輸入值?(input+textarea) 
    console.log("pairs="+pairs)     //pairs內容是"title=標題文字&body=內容文字"
    const post = {}
    for (const [key, value] of pairs) {   //key 是name   value是<input>內輸入的值 都是pairs物件(input與textarea 都用name來判斷而已)內有的東西  
      post[key] = value                   //將pairs的[欄位內容,欄位內容] 給post這個物件 欄位名key 欄位內容value 
    }
    console.log('post=', post)
    const id = posts.push(post) - 1;   //push會回傳現在是陣列的第幾筆  
    post.created_at = new Date();      //紀錄日期
    post.id = id;                       //這樣就能讓網址列對應到第幾個post，對到13行的show render.js的100行show()
    ctx.response.redirect('/');         //回去路徑/
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
