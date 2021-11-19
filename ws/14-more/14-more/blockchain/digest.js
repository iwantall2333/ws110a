import { createHash } from 'https://deno.land/std/hash/mod.ts';

function hash(text) {
  const h = createHash('sha256')  //要求用此雜湊函數
  h.update(text)
  return h.toString()
}

let record = {
  nonce: 0,
  data: 'john => mary $2.7',  //對這筆交易資料作雜湊
}

let json = JSON.stringify(record, null, 2)   //將交易資料轉成字串
console.log('json=', json)
const digest = hash(json)

console.log('digest=', digest)
