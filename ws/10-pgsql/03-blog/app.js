import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
// import { DB } from "https://deno.land/x/sqlite/mod.ts";
// const db = new DB("blog.db");
// db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

import { Client, Pool } from "https://deno.land/x/pg@v0.5.0/mod.ts";

const db = new Client({
  //這個client套件 幫我作createdb -U postgres mydb1 創建一個資料庫檔案到本地端(本地端作為server機器 且 下載了pgsql的應用程式讓你能放資料庫到本地端) 
  //(如果放到linode上 不就要把資料庫放上去?)
  //創建database名叫blog  照著下面的設定資料庫檔案
  user: 'postgres',
  hostname: '127.0.0.1',
  database: 'blog',   
  password: 'ccc123456',
  port: 5432
});
//在後面的程式碼中，藉由postgre套件，用他的語法創建表格到資料庫內

await db.connect();
// db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

const router = new Router();

router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

async function query(sql) {
  console.log('query:sql=', sql)
  var r = await db.query(sql)
  console.log('r=', r)
  let list = []
  for (var row of r.rows) {
    list.push(row)
  }
  return list
}

async function list(ctx) {
  let posts = await query("SELECT id, title, body FROM posts")
  console.log('list:posts=', posts)
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function show(ctx) {
  const pid = ctx.params.id;
  let posts = await query(`SELECT id, title, body FROM posts WHERE id=${pid}`)
  let post = posts[0]
  console.log('show:post=', post)
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('create:post=', post)
    await db.query(`INSERT INTO posts (title, body) VALUES ('${post.title}', '${post.body}')`);
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
