import { FunctionalComponent, h } from "preact";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";

const ENDPOINT = "http://localhost:8081";

const Home: FunctionalComponent = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("Transactions", (data) => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>

      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
    </div>
  );
};

export default Home;
