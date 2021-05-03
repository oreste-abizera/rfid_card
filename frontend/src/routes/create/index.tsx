import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import style from "./style.css";

const Create: FunctionalComponent = () => {
  return (
    <div class={style.createPage}>
      <h1>Record a transaction</h1>
      <Link href="/">
        <h4>Return to Home</h4>
      </Link>
    </div>
  );
};

export default Create;
