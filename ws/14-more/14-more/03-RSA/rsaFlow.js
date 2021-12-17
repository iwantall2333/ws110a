// const NodeRSA = require('node-rsa');
import RSA from "https://dev.jspm.io/node-rsa"

// const key = new RSA({b: 2048});
const keyPem = await Deno.readTextFile("./private.pem")
const key = new RSA(keyPem);
const plaintext = 'pay John => Mary $100';
console.log('plaintext: ', plaintext);
const encrypted = key.encrypt(plaintext, 'base64'); //用私鑰做RSA加密後寫成base64
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');   
console.log('decrypted: ', decrypted);
//簽章
const signature = key.sign(plaintext)//用私鑰做簽章

const pubPem = await Deno.readTextFile("./public.pem") //公鑰
const pubKey = new RSA(pubPem);//產生公鑰

console.log('signatureA=', signature)

// const isVerified = key.verify(plaintext, signature)
const isVerified = pubKey.verify(plaintext, signature)  //公鑰.(訊息,訊息做私鑰簽章)  要看顆顆的數位簽章圖筆記
//把plaintext hash 與 signature用pubkey解密後得到的hash 做比對 (所以雜湊公式是他幫你用的)
console.log('isVerified=', isVerified)


const isVerified2 = pubKey.verify(plaintext+'a', signature)
console.log('isVerified2=', isVerified2)

signature[0] = signature[0]+1
const isVerified3 = pubKey.verify(plaintext, signature)
console.log('isVerified3=', isVerified3)
