import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import { useState } from "preact/hooks";
import style from "./style.css";
import axios from "axios";
import { route } from "preact-router";

const ENDPOINT = "http://localhost:8081";

const Create: FunctionalComponent = () => {
  const [cardId, setCardId] = useState("");
  const [initialBalance, setinitialBalance] = useState("");
  const [transactionFare, settransactionFare] = useState("");
  const [newBalance, setnewBalance] = useState("");

  const changeCardId = (e: any) => {
    setCardId(e.target.value);
  };
  const changeInitialBalance = (e: any) => {
    setinitialBalance(e.target.value);
  };
  const changeTransactionFare = (e: any) => {
    settransactionFare(e.target.value);
  };
  const changeNewBalance = (e: any) => {
    setnewBalance(e.target.value);
  };

  const recordTransaction = async (e: any) => {
    e.preventDefault();
    const dataToSend = {
      cardId,
      initial_balance: parseInt(initialBalance),
      transaction_fare: parseInt(transactionFare),
      new_balance: parseInt(newBalance),
    };
    try {
      let response = await axios.post(`${ENDPOINT}/transactions`, dataToSend);
      if (response) {
        if (response.data?.success) {
          route("/");
        } else {
          alert("error occured...");
        }
      } else {
        alert("Server unreachable...");
      }
    } catch (error) {
      alert("Error occured");
    }
  };

  return (
    <div class={style.createPage}>
      <h1>Record a transaction</h1>
      <form onSubmit={recordTransaction}>
        <input
          type="text"
          placeholder="card id"
          required
          value={cardId}
          onInput={changeCardId}
        ></input>
        <input
          type="number"
          placeholder="initial balance"
          required
          value={initialBalance}
          onInput={changeInitialBalance}
        ></input>
        <input
          type="number"
          placeholder="transaction fare"
          required
          onInput={changeTransactionFare}
          value={transactionFare}
        ></input>
        <input
          type="number"
          placeholder="new balance"
          required
          onInput={changeNewBalance}
          value={newBalance}
        ></input>

        <input type="submit">Record</input>
      </form>
      <Link href="/">
        <h4>Return to Home</h4>
      </Link>
    </div>
  );
};

export default Create;
