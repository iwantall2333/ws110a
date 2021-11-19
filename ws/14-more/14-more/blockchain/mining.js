import { createHash } from 'https://deno.land/std/hash/mod.ts';

function hash(text) {
  const h = createHash('sha256')
  h.update(text)
  return h.toString()
}

let record = {
  nonce: 0,
  data: 'john => mary : $2.7; george => john : $1.3',
}

function mining(record) {
  for (var i=0; i<1000000000000; i++) {    //nonce從0開始試
    record.nonce = i
    // record.nonce = Math.floor(Math.random()*100000000)                  //16行註解 17取消註解 就是用亂數找 就你也有可能挖到
    let h = hash(JSON.stringify(record))
    if (h.startsWith('00000')) return { record: record, hash: h }   //如果找到5個前導零就挖到了
  }
}
//你有很多nonce可以去試 因為這裡從0開始找 所以只會找到第一個 (hash的值是固定的)
console.log(mining(record))