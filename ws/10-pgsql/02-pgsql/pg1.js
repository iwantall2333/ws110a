import { Client, Pool } from "https://deno.land/x/pg@v0.5.0/mod.ts";

const client = new Client({
  user: 'postgres',
  hostname: '127.0.0.1',
  database: 'mydb',
  password: 'ccc123456',
  port: 5432
});

await client.connect();

const res = await client.query('SELECT * from weather');
console.log(res);
await client.end();
