import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Create: FunctionalComponent = () => {
  return (
    <div class={style.createPage}>
      <h1>Record a transaction</h1>
      <form>
        <input type="text" placeholder="card id" required></input>
        <input type="number" placeholder="initial balance" required></input>
        <input type="number" placeholder="transaction fare" required></input>
        <input type="number" placeholder="new balance" required></input>

        <input type="submit">Record</input>
      </form>
      <Link href="/">
        <h4>Return to Home</h4>
      </Link>
    </div>
  );
};

export default Create;
