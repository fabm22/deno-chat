import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
  text: string
}

const CHAT_URL_DENODEPLOY = 'https://fabm22-deno-chat-api.deno.dev/';
const MESSAGES_URL = CHAT_URL_DENODEPLOY + 'messages';


export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');

  const getMessages = useCallback(async () => {
    const res = await fetch(MESSAGES_URL);
    const data = await res.json();
    setMessages(data)
  }, [])

  useEffect(() => {
    getMessages()
  }, [])

  const onSendMessage = useCallback(async () => {
    await fetch(MESSAGES_URL, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'content-type': 'application/json'
      }
    });
    setText('');
    getMessages();
  }, [text]);

  return (<div>
    <div> {JSON.stringify(messages)} </div>
    <input type="text" value={text} onChange={(evt) => setText(evt.target.value)} />
    <button onClick={onSendMessage}>Add</button>
  </div>);
  // return (
  //   <div>
  //     <p>
  //       Welcome to `fresh`. Try update this message in the ./pages/index.tsx
  //       file, and refresh.
  //     </p>
  //     <Counter />
  //     <p>{IS_BROWSER ? "Viewing browser render." : "Viewing JIT render."}</p>
  //   </div>
  // );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <div>
    <p>{count}</p>
    <button onClick={() => setCount(count - 1)} disabled={!IS_BROWSER}>
      -1
    </button>
    <button onClick={() => setCount(count + 1)} disabled={!IS_BROWSER}>
      +1
    </button>
  </div>;
}
