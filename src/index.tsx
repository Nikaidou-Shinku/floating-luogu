import $ from "jquery";
import React from "react";
import { render } from "react-dom";
import { consts } from "./data/constants";
import { getUser } from "./data/LuoguAPI";
import { Hello, CardLoader } from "./components";
import { getUID } from "./utils";

const helloContainer = $(".lg-index-content");
if (helloContainer.length > 0) {
  helloContainer.prepend(`<div class="am-g" id="user-card-hello" />`);
  render(<Hello />, document.getElementById("user-card-hello"));
}

const cardContainer = $(`<div style="position: absolute; top: 0; left: 0" />`);
$("body").append(cardContainer);

let cardId = -1;

const loadCard = (baseNode: Node) => {
  $(baseNode).find("a").filter((_index, element) => {
    const uid = getUID($(element).attr("href"));
    if (uid < 0) return false;
    const parent = $(element).parent();
    const markUID = parent.attr("uid"); // check attr "uid" to avoid multiple rendering
    if (markUID === undefined) {
      parent.attr("uid", uid); // set attr "uid" to avoid multiple rendering
      return true;
    }
    if (Number(markUID) === uid)
      return false;
    parent.attr("uid", uid); // set attr "uid" to avoid multiple rendering
    return true;
  }).each((_index, element) => {
    const uid = Number($(element).parent().attr("uid"));
    const childrenList = $(element).parent().children();
    childrenList.each((_index, element_now) => {
      if (element_now === element) {
        ++ cardId;
        $(element_now).attr("cardid", cardId);
        const container = $(`<div cardid=${cardId} />`);
        cardContainer.append(container);
        render(<CardLoader uid={uid} id={cardId}/>, container[0]);
      }
    });
  });
};

const getSelf = () => {
  consts.csrfToken = $(`meta[name="csrf-token"]`).attr("content");
  $.ajax({
    async: false,
    type: "GET",
    url: getUser(3),
    headers: {
      "x-luogu-type": "content-only"
    },
    success: (res) => {
      const tmp = res.currentUser;
      if (tmp !== undefined)
        consts.currentUID = tmp.uid;
    }
  });
}

getSelf();
setInterval(() => { loadCard(document); }, 500);
