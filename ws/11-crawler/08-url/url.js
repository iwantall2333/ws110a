var u = new URL("../b/c.html?q=abc", "http://a.example/with/a/long/path.file?search#fragment")//本來在Long資料夾 第一個""內的..則會讓他回到上一層路徑
//("我要去哪裡","現在所在的網址")
//執行結果 : u.href= http://a.example/with/a/b/c.html?q=abc   回到上一層路徑後到/b/c.html?q=abc
console.log('u=', u)
console.log('u.href=', u.href)
