# 簡易單向訊息
會這個蠻重要
需要開兩個終端機 :client端輸入的訊息會顯示在server上面
## server.ts

```
PS D:\ccc\ccc109\ws\deno\08-websocket\03-chat> deno run -A server.ts
```

## client.ts

```
PS D:\ccc\ccc109\ws\deno\08-websocket\chat> deno run -A client.ts
Check file:///D:/ccc/ccc109/ws/deno/08-websocket/chat/client.ts
ws connected! (type 'close' to quit)
> hi
hi
> ccc
ccc
>
```
關掉的話終端機打
```
close
```