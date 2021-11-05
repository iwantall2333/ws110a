async function getPage(url) {
  const res = await fetch(url);
  return await res.text();
}

async function craw(urlList) {
  for (let i in urlList) {                  //2.爬的網站一個個塞
    var url = urlList[i]
                                                                      console.log(url, 'download')
    var page = await getPage(url)
    await Deno.writeTextFile(`data/${i}.txt`, page)   //3.塞到這裡
  }
}

var urlList = [     //1.爬的網站
  'https://example.com', 
  'https://jsonplaceholder.typicode.com/todos/1', 
  'https://jsonplaceholder.typicode.com/todos/2', 
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
  'https://jsonplaceholder.typicode.com/todos/6',
  'https://jsonplaceholder.typicode.com/todos/7',
  'https://jsonplaceholder.typicode.com/todos/8',
  'https://jsonplaceholder.typicode.com/todos/9',
  'https://jsonplaceholder.typicode.com/todos/10',
  'https://jsonplaceholder.typicode.com/todos/11',
]

await craw(urlList)
//執行deno run -A crawler.js
//東西會載入到data資廖夾
