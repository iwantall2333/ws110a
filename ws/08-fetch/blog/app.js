import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";

const app = new Application()

const posts = [
  {id: 0, title: 'aaa', body: 'aaaaa'}, 
  {id: 1, title: 'bbb', body: 'bbbbb'}
]

const router = new Router()
//鄉比以前，呈現畫面的動作沒了 : 
router.get('/list', list)  
  .get('/post/:id', show)
  .post('/post', create)

app.use(router.routes()) //要求先去執行router的東西
app.use(router.allowedMethods())

app.use(async (ctx, next) => {
  await next()    //若前面沒有被router截走 (so會先把上面的router.執行完)   //await next() 是給下一個中間件執行  (中間件:程式執行到一半先給下一個程式執行，...)
  console.log('path=', ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public/`,
    index: "index.html",  //當你網址列後面甚麼都沒打，預設就出現index.html   也可以寫在router內
  })
})

async function list (ctx) {
  ctx.response.type = 'application/json'   //告訴他傳回的是json而非html，讓瀏覽器辨識 //?
  ctx.response.body = posts       
}

async function show (ctx) {
  const id = ctx.params.id
  const post = posts[id]
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.response.type = 'application/json'   //告訴他傳回的是json而非html，讓瀏覽器辨識
  ctx.response.body = post   //why need this???
}

async function create (ctx) {
  // var post = ctx.request.body
  const body = ctx.request.body(); // content type automatically detected
  //console.log('body = ', body)
  if (body.type === "json") {         //app.js  body: JSON.stringify({title: title, body: body})  body是json型態
    let post = await body.value;      //body.value 即 app.js的JSON.stringify({title: title, body: body})的{title: title, body: body}，oak會把JSON自動轉成物件
    const id = posts.push(post) - 1   /*推回上面的posts 然後再把值-1存到id內*/
    /*可以寫成
      post.id = posts.length
      posts.push(post)*/      
    //console.log('create:id=>', id) console.log('create:get=>', post)
    //post.created_at = new Date()
    post.id = id              //區域變數內，因為  posts.push(post) 傳的post是地址，所以post改掉   ，posts內的post物件也會跟著被改
        
    //ctx.response.body = post      //可以不寫也沒關係，但為了讓網頁覺得他有傳回去就打上去了   同下一行
    ctx.response.body = "success"   //不傳回success 前端會傳回404找不到
    //console.log('create:save=>', post)   //create:save=> { title: "asdas", body: "asd", created_at: 2021-10-29T02:58:51.251Z, id: 2 }
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })
