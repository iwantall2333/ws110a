export function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
    .mtitle{
      position:absolute;
      transform:translate(+50%,+50%);   //position absolute原點在左上//有時候要打+50%，不懂為何
      left:50%;
    }
    .mcontent{
      position:absolute;
      transform:translate(+50%,+50%);   //position absolute原點在左上//有時候要打+50%，不懂為何
      left:50%;
      display: inline;
    }
      body {
        border-radius:15px;
        padding: 80px;
        font: 16px Helvetica, Arial;
        border:solid 10px pink;
        background-color:#9E7A7A;
      }
  
      h1 {
        font-size: 1em;
      }
  
      h2 {
        font-size: 1.2em;
      }
      #h-logout {
        float:right;
        display: inline;}
    
  
      textarea {
        width: 500px;
        height: 300px;
      }
      .button {
        
        display: inline;
        display: inline-block;
        cursor: pointer;
        text-align: center;   
        text-decoration: none;
        outline: none;
        color: #9F353A;
        background-color: #FEDFE1;
        border: none;
        border-radius: 10px;
        box-shadow: 0 9px #9E7A7A;
        padding: 5px;
      }
      
      .button:hover {background-color: #F4A7B9}
      
      .button:active {
        background-color: #F4A7B9;
        box-shadow: 0 5px #9E7A7A;
        transform: translateY(4px);
      }
      input[type=text],input[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
      
      input[type=text],input[type=password] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function loginUi() {
  return layout('Login', `
  <h1 class="mtitle">Login</h1>
  <form action="/login" method="post" class="mcontent">
    <p><input type="text" placeholder="使用者名稱" name="username"></p>
    <p><input type="password" placeholder="密碼" name="password"></p>
    <p ><input class="button" type="submit" value="登入"></p>
    <p>論壇新朋友? <a href="/signup">註冊</p>
  </form>
  `)
}

export function signupUi() {
  return layout('Signup', `
  <h1>Signup</h1>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="新的使用者名稱" name="username"></p>
    <p><input type="password" placeholder="設置密碼" name="password"></p>
    <p><input type="text" placeholder="email" name="email"></p>
    <p><input class="button" type="submit" value="Signup"></p>
  </form>
  `)
}

export function success() {
  return layout('Success', `
  <h1>註冊成功</h1>
  點擊按鈕返回<a href="/">登入</a> 介面
  `)
}

export function fail() {
  return layout('Fail', `
  <h1>登入失敗</h1>
  <a href="/">重返登入畫面</a> 
  `)
}

export function list(posts, user) {
  console.log('list: user=', user)
  let list = []
  for (let post of posts) {
    list.push(`
      <p style="display:inline;color:white;"> --> </p> 
      <p style="display:inline;color:yellow;"> ${post.username}:</p> 
      <p  style="display:inline;color:#563F2E;">${ post.title }</p>
      </br>
      </br>
    `)
  }
  let content = `
  <h1>secret論壇</h1>

  <p>顯示<strong>${posts.length}</strong>則留言</p>
  <ul>
    ${list.join('\n')}
  </ul>
  <p>${(user==null)?'<a href="/login">Login</a> to Create a Post!':'<a class="button" href="/post/new">留言</a> <a class="button" id="h-logout" href="/logout">登出</a> '}</p>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Post', `
  <h1>輸入留言</h1>
  <form action="/post" method="post">
    <p><input type="text" placeholder="請勿作不適當的人身攻擊，否則以法律追究" name="title"></p>
    <p><input class="button" type="submit" value="Create"></p>
  </form>
  `)
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title} -- by ${post.username}</h1>
    <p>${post.body}</p>
  `)
}
