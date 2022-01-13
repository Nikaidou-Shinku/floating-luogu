import React from "react";
import { Hello, CardLoader } from "./components";
import { render } from "react-dom";
import $ from "jquery";

const helloContainer = $(".lg-index-content");
if (helloContainer.length > 0) {
  helloContainer.prepend(`<div class="am-g" id="user-card-hello" />`);
  render(<Hello />, document.getElementById("user-card-hello"));
}

const cardContainer = $(`<div style="position: absolute; top: 0; left: 0" />`);
$("body").append(cardContainer);

let cardId = 0;

const loadCard = (baseNode: Node) => {
  $(baseNode).find("a").filter((_index, element) => {
    const parent = $(element).parent();
    if (parent.attr("isCard") !== undefined) // test attr "isCard" here
      return false;
    const href = $(element).attr("href");
    if (href === undefined)
      return false;
    const res = href.match(/^\/user\/\d+$/);
    return res !== null;
  }).each((_index, element) => {
    $(element).parent().attr("isCard", "true"); // set attr "isCard" to avoid multiple rendering
    const childrenList = $(element).parent().children();
    childrenList.each((_index, element_now) => {
      if (element_now === element) {
        ++ cardId;
        $(element_now).attr("cardid", cardId);
        const container = $(`<div cardid=${cardId} />`);
        cardContainer.append(container);
        render(<CardLoader init={element_now.outerHTML} id={cardId}/>, container[0]);
      }
    });
  });
};

$(window).on("load", () => { loadCard(document); });

const benbenNode = $("#feed")[0];
if (benbenNode !== undefined) {
  const observer = new MutationObserver((mutations, _observer) => {
    const nodeList = mutations[0].addedNodes;
    nodeList.forEach((node) => { loadCard(node); });
  });
  observer.observe(benbenNode, { childList: true });  
}
