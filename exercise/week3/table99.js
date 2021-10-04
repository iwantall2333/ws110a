import { Application,send } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use(async(ctx) => {
  console.log('path=', ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
    root: Deno.cwd(),       
    index: "99tab.html",
  });  
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

/*function table99(){
    let table=["<table><tr><th></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr>"]
    for (let i=1;i<=9;i++){
        let row =`<tr><th>${i}</th>`
        for(let j=1;j<=9;j++){
            row+=`<td>${i*j}</td>`
        }
        row +="</tr>"
        table.push(row)
    }
    return table.join('\n')+"</table>"  //把陣列拼起來用字串顯示
}*/