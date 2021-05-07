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
  timestamp: Date;
  updated_at: Date;
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

  let cards: Array<String> = transactions.map(
    (transaction) => transaction.cardId
  );
  cards = cards.filter(function (item, pos) {
    return cards.indexOf(item) == pos;
  });
  return (
    <div class={style.home}>
      <h1>Registered cards</h1>
      {loading ? (
        <Skeleton count={5}></Skeleton>
      ) : (
        <div>
          {cards.length === 0 && <h6>No registerd cards</h6>}
          <ol>
            {cards.map((card) => (
              <li key={card}>{card}</li>
            ))}
          </ol>
        </div>
      )}
      <h1>List of transactions</h1>
      <table>
        <tr>
          <th>Card id</th>
          <th>Initial balance</th>
          <th>Transaction fare</th>
          <th>New Balance</th>
          <th>Time</th>
        </tr>
        {transactions.map((transaction, index) => {
          let d = transaction.timestamp
            ? new Date(transaction.timestamp)
            : new Date(2021, 4, 5);
          let options: any = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          };
          let formatedDate = new Intl.DateTimeFormat("en", options).format(d);

          return (
            <tr key={index}>
              <td>{transaction.cardId}</td>
              <td>{transaction.initial_balance}</td>
              <td>{transaction.transaction_fare}</td>
              <td>{transaction.new_balance}</td>
              <td>{formatedDate}</td>
            </tr>
          );
        })}
      </table>
      {!loading && transactions.length === 0 && <h6>No transactions found.</h6>}
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
