import $ from "jquery";
import React from "react";
import { render } from "react-dom";
import { userPageRegex, consts } from "./data/constants";
import { Hello, CardLoader } from "./components";

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
    let ok = false;
    userPageRegex.forEach((item) => {
      if (href.match(item) !== null)
        ok = true;
    });
    return ok;
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

const getSelf = () => {
  consts.csrfToken = $(`meta[name="csrf-token"]`).attr("content");
  $.ajax({
    async: false,
    type: "GET",
    url: `https://www.luogu.com.cn/user/3`,
    headers: { "x-luogu-type": "content-only" },
    success: (res) => {
      const tmp = res.currentUser;
      if (tmp !== undefined)
        consts.currentUID = tmp.uid;
    }
  });
}

getSelf();
setInterval(() => { loadCard(document); }, 500);
