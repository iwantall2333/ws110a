var html = `
<html>
<body>
<a href='https://tw.msn.com/a/1.html'></a>
<a href= 'https://tw.msn.com/a/2.html'></a>
<a href ='https://tw.msn.com/b/1.html'></a>
<a href =   'https://tw.msn.com/b/2.html'></a>
<a href="https://tw.msn.com/c/1.html"></a>
<a href="/c/1.html">xxxx</a>
<a href="c/1.html">xxxx</a>
<a href="../../c/1.html">xxxx</a>
</body>
</html>
`

var r = /\shref\s*=\s*['"](.*)['"]/g  //透過正規表達式將網頁內的網址抽出來 (抓href 且又取引號內的部分(.*))

//var urls = html.match(r)  //match抓成陣列
//console.log('urls=', urls)

while (true) {
  let m = r.exec(html)  //r與html比對，成功傳回m   //每次都執行一筆資料 接續執行 所以要用while 然後所有筆資料結束後就==null
  if (m == null) break
  console.log(`${m[1]}`)    //m[1]是正規表達式中語法的(capturingGroup)，m[1]指結取出第一個()內的內容，這裡是['"](.*)['"]的(.*) 所以是引號內的內容
}
//抽網址