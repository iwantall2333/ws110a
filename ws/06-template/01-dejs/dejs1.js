const { cwd, stdout, copy } = Deno;
import { render } from "https://deno.land/x/dejs/mod.ts";

const template = `<body>
  <% if (name) { %>
    <h1>hello, <%= name %>!</h1>
  <% } %>
</body>`;
//if name有定義，傳回hello world
(async () => {
  const output = await render(template, {
    name: "world"
  });
  await copy(output, stdout);
})();