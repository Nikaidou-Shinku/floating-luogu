import React from "react";
import { Hello, CardLoader } from "./components";
import { render } from "react-dom";
import $ from "jquery";

const container = $(".lg-index-content");
if (container.length > 0) {
  container.prepend(`<div class="am-g" id="user-card-hello" />`);
  render(<Hello />, document.getElementById("user-card-hello"));
}
const cardContainer = $("<div style='position: absolute; top: 0; left: 0'></div>");
$("body").append(cardContainer);

let cardID = 0;

const loadCard = (baseNode: Node) => {
  $(baseNode).find("a").filter((_index, element) => {
    const parent = $(element).parent();
    if (parent.attr("isCard") !== undefined)
      return false;
    const href = $(element).attr("href");
    if (href === undefined)
      return false;
    const res = href.match(/^\/user\/\d+$/);
    return res !== null;
  }).each((_index, element) => {
    $(element).parent().attr("isCard", "true");
    const childrenList = $(element).parent().children();
    childrenList.each((_index, element_now) => {
      if (element_now === element) {
        $(element_now).attr("cardID", ++ cardID);
        const container = $(`<div style="display: inline;" cardid=${cardID}/>`);
        cardContainer.append(container);
        render(<CardLoader init={element_now.outerHTML} cardid={cardID}/>, container[0]);
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
