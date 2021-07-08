import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

app.use((ctx) => {
    ctx.response.body = 'Hello world';
})


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