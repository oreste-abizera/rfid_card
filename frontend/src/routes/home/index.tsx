import { FunctionalComponent, h } from "preact";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "preact/hooks";
import style from "./style.css";

const ENDPOINT = "http://localhost:8081";

interface Transaction {
  cardId: String;
  initial_balance: Number;
  transaction_fare: Number;
  new_balance: Number;
}

const Home: FunctionalComponent = () => {
  const [transactions, settransactions] = useState<Array<Transaction>>([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("Transactions", (data) => {
      settransactions(data);
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
    </div>
  );
};

export default Home;
