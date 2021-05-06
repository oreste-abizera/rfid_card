import { FunctionalComponent, h } from "preact";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";
import { route } from "preact-router";
import Skeleton from "react-loading-skeleton";

const ENDPOINT = "http://localhost:8081";

interface Transaction {
  cardId: String;
  initial_balance: Number;
  transaction_fare: Number;
  new_balance: Number;
}

const Home: FunctionalComponent = () => {
  const [loading, setloading] = useState<Boolean>(true);
  const [transactions, settransactions] = useState<Array<Transaction>>([]);

  useEffect(() => {
    setloading(true);
    const socket = socketIOClient(ENDPOINT);
    socket.on("Transactions", (data) => {
      settransactions(data);
      setloading(false);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  return (
    <div class={style.home}>
      <h1>List of transactions</h1>
      <table>
        <tr>
          <th>Card id</th>
          <th>Initial balance</th>
          <th>Transaction fare</th>
          <th>New Balance</th>
        </tr>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.cardId}</td>
            <td>{transaction.initial_balance}</td>
            <td>{transaction.transaction_fare}</td>
            <td>{transaction.new_balance}</td>
          </tr>
        ))}
      </table>
      {loading && (
        <div style={{ width: "100%" }}>
          <Skeleton
            count={5}
            style={{ width: "100%", height: "2rem" }}
          ></Skeleton>
        </div>
      )}

      <button onClick={() => route("/create")}>Record transaction</button>
    </div>
  );
};

export default Home;
