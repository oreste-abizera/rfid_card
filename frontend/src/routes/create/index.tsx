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
  const [type, settype] = useState("");

  const changeCardId = (e: any) => {
    setCardId(e.target.value);
  };
  const changeInitialBalance = (e: any) => {
    setinitialBalance(e.target.value);
  };
  const changeTransactionFare = (e: any) => {
    settransactionFare(e.target.value);
  };
  const changetype = (e: any) => {
    settype(e.target.value);
  };

  const recordTransaction = async (e: any) => {
    e.preventDefault();
    const dataToSend = {
      cardId,
      initial_balance: parseInt(initialBalance),
      transaction_fare: parseInt(transactionFare),
      transaction_type: type,
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
          placeholder="initial balance (Enter 0 if the card exists)"
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
        <select onInput={changetype} value={type} required>
          <option>Select transaction type</option>
          <option value="remove">Remove Amount</option>
          <option value="add">Add Amount</option>
        </select>

        <input type="submit" value="Record"></input>
      </form>
      <Link href="/">
        <h4>Return to Home</h4>
      </Link>
    </div>
  );
};

export default Create;
