# Blog -- AJAX 版

```
PS D:\ccc\ccc109a\ws\deno\07-ajax\blog> deno run -A app.js
Check file:///D:/ccc/ccc109a/ws/deno/07-ajax/blog/app.js
Server run at http://127.0.0.1:8000
path= /
path= /main.js
body =  { type: "json", value: Promise { <pending> } }
create:id=> 2
create:get=> { title: "ccc", body: "ccccc" }
create:save=> { title: "ccc", body: "ccccc", created_at: 2020-08-15T05:50:49.501Z, id: 2 }
body =  { type: "json", value: Promise { <pending> } }
create:id=> 3
create:get=> { title: "ddd", body: "ddddd" }
create:save=> { title: "ddd", body: "ddddd", created_at: 2020-08-15T05:51:20.983Z, id: 3 }
```
# 差別   :網址列的# 
## 將參數放到網紙列
server只傳回JSON，前後端完整切開，前端處理網頁呈現的事情

#### 相比之前 將render拿掉了，因後端不再處理網頁呈現

## 把前端複雜的東西放在github上 或者CDN，這樣省了後端要傳前端資料給client
