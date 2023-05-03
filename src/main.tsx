import { render } from "solid-js/web";
import { logInfo } from "./utils";
import { HelloBlock } from "./components";

const insertHelloBlock = () => {
  logInfo("Starting...");

  if (import.meta.env.MODE === "dev") {
    const container = document.getElementsByClassName("lg-index-content");

    if (container.length > 0) {
      const helloContainer = document.createElement("div");
      helloContainer.classList.add("am-g");

      container[0].prepend(helloContainer);

      render(() => <HelloBlock />, helloContainer);
    }
  }
};

const main = () => {
  insertHelloBlock();
};

main();
