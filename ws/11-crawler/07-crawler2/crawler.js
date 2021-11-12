async function getPage(url) {
  const res = await fetch(url);
  return await res.text();
}

function html2urls(html) {
  var r = /\shref\s*=\s*['"](.*)['"]/g                
  var urls = []
  while (true) {
    let m = r.exec(html)
    if (m == null) break
    urls.push(m[1])                 
  }
  return urls
}

async function craw(urlList) {
  for (let i=0; i<urlList.length; i++) {
    var url = urlList[i]
                                          console.log(url, 'download')
    if (!url.startsWith('http')) continue               //非http開頭則不會抓取，所以網頁的相對路徑都抓不到了   
    try {
      var page = await getPage(url)             //取得該網頁內的所有url 且為文字(res.text())
      await Deno.writeTextFile(`data/${i}.txt`, page)  //將第i筆網址放入data資料夾 
      var urls = html2urls(page)
      for (url of urls) {
        urlList.push(url)                               //再把所有讀到的url通通往後接續塞入urlList //push之後 回到18行 會觸發for 下一個i 所以不會又從第一筆資料開始 
      } 
    } catch (error) {
      console.log('error=', error)
    }
  }
}
//再把所有讀到的url通通往後接續塞入urlList //再讀下一筆資料 所以這裡是邏輯:writeText執行順序 : 第一個url-->下面的第一.一個url-->下面的第一.一.一個url 優先性設計有問題 理想應該為第一個url-->第二個url-->第三個url-->讀完才往更下一層的url讀取

var urlList = [
  'https://example.com', 
]

await craw(urlList)
