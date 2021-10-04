/*有問題 */
import { Application,send,Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get('/',(ctx)=>{ctx.response.body=table99()})

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: Deno.cwd()+'/file/',       
  });  
  //ctx.response.body=table99()        /*為啥不行勒，有辦法結合js嗎*/
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

/*html*/
function table99(){
    let table=["<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>"]
    for (let i=1;i<=9;i++){
        let row =`<tr><th>${i}</th>`
        for(let j=1;j<=9;j++){
            row+=`<td>${i*j}</td>`
        }
        row +="</tr>"
        table.push(row)
    }
    var a=`<html><head><link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css"><link rel="stylesheet" href="table.css" type="text/css">
    </head><body>`
    return a+table.join('\n')+"</table>"+"</body></html>"  //把陣列拼起來用字串顯示
}