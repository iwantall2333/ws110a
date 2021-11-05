const res = await fetch('https://jsonplaceholder.typicode.com/todos/1'); /*ajax後端網站 fetch:抓取內容(.js就抓js檔內容 .html就抓.html檔) */
//現在還是htmlClient的方式(紙本筆記) 抓了的時候不會先去執行js檔(不適用web2.0，因為只抓到js字串，卻沒有先執行js然後載入html，所以抓到的會是空的東西)
// const res = await fetch('https://example.com/');
const data = await res.text(); // res.json()   /*res.text()是把內容轉成文字 */
console.log(data)
//要先執行的話 工具:puppeteer 讓他幫你點擊網頁，先作動作，以先去執行js