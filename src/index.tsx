import React from "react";
import { Hello, CardLoader } from "./components";
import $ from "jquery";
import { render } from "react-dom";

$(".lg-index-content").prepend(`<div class="am-g" id="user-card-app" />`);
render(<Hello />, document.getElementById("user-card-app"));

$("a").filter((_index, element) => {
  const href = $(element).attr("href");
  if (href === undefined)
    return false;
  const res = href.match(/^\/user\/\d+$/);
  return res !== null;
}).each((index, element) => {
  render(<CardLoader init={element.innerHTML} />, document.getElementById("user-card-app"));
});
