import { prompt } from '../prompt.ts'

while (true) {
  var line = await prompt("> ")    //範例目的 :了解deno如何作輸入
  console.log('you type: ', line)
}

//輸入deno run main.ts
