// import {  } from "https://deno.land/std@0.99.0/http/http_status.ts";
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors} from 'https://deno.land/x/cors/mod.ts';


const messages : string [] = []; // new Map<string, any>();
const channel = new BroadcastChannel("chat");


const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Deno Chat server!";
  })
  .get("/messages",  (context) => {
    context.response.body = messages; // Array.from(messages.values());
  })
  .post("/messages", async (context) => {
      const msg = await context.request.body().value;
      messages.push(msg);
      context.response.body = msg;
  })
;

const app = new Application();

app.use(oakCors()); // MUST be first
app.use(router.routes());
app.use(router.allowedMethods());


addEventListener('fetch', app.fetchEventHandler())

// // window.
// addEventListener('fetch', (event) => {
//     const response = new Response('Hello wooorld', {
//         headers: {
//         'content-type': 'text/plain'
//         }
//     });

//     // @ts-ignore not sure why
//     event.respondWith(response)
// })



// const app = new Application();

// app.use((ctx) => {
//     ctx.response.body = 'Hello wooorld with Oak.';
// })