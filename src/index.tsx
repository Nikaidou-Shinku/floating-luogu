import React from "react";
import { Hello, CardLoader } from "./components";
import $ from "jquery";
import { render } from "react-dom";

const container = $(".lg-index-content");
if (container.length > 0) {
  container.prepend(`<div class="am-g" id="user-card-hello" />`);
  render(<Hello />, document.getElementById("user-card-hello"));
}

const loadCard = () => {
  $("a").filter((_index, element) => {
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
        const container = $(`<div style="display: inline;" />`);
        $(element_now).after(container);
        render(<CardLoader init={element_now.outerHTML} />, container[0]);
        element_now.remove();
      }
    });
  });
};

$("#feed-more").on("click", () => {
  setTimeout(loadCard, 2000);
});
