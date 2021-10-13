export function layout(title, content) {
    return `
    <html>
    <head>
    <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
      <title>${title}</title>
      <style>
        div{
            padding:10px;
            border-radius:10px;
            width:90%;
            background-color:	lavender;
        }
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }
      </style>
    </head>
    <body>
        <p>本網頁使用<a href="https://github.com/oxalorg/sakura" target="_blank">sakura.css</a></p>
            <section id="content">
                ${content}
            </section>        
    </body>
    </html>
    `
  }
  
  export function list(posts) {/*change from here */
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>事項 : ${ post.title }</h2>
        <p>日期 : ${post.date}</p>
        <p><a href="/post/${post.id}">讀取詳情</a></p>
      </li>
      `)
    }
    /*update content*/
    let content = `
    <h1>行事曆</h1>
    <p>你有 <strong>${posts.length}</strong> 件代辦事項!</p>
    <form action="/post/new" method="post"> 
        <input type="submit" value="新增行程">
    </form>     
    <div>
        <ul id="posts">
        ${list.join('\n')}
        </ul>
    </div>
    `
    return layout('Posts', content)
  }
  
  export function newPost() {//get網址列會顯示錯
    return layout('New Post', `
    <h1>新增行程</h1>
    <form action="/post" method="post">  
      <p><input type="text" placeholder="title" name="title"></p>
      <p><input type="date" placeholder="XXXX/XX/XX" name="date"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
  }
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <p>日期 : ${post.date}</p>
      <p>詳細內容</p>
      <p>${post.body}</p>
    `)
  }
  