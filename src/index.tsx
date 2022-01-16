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

$("body").append(`
<style>
.rotatable{
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1s;
  -moz-transition-property: -moz-transform;
  -moz-transition-duration: 1s;
  -webkit-animation: rotate 1s linear infinite;
  -moz-animation: rotate 1s linear infinite;
  -o-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@-webkit-keyframes rotate{
 from{
     -webkit-transform: rotate(0deg)
 }
  to{
     -webkit-transform: rotate(360deg)
 }
}
@-moz-keyframes rotate{
 from{
     -moz-transform: rotate(0deg)
 }
  to{
     -moz-transform: rotate(359deg)
 }
}
@-o-keyframes rotate{
 from{
     -o-transform: rotate(0deg)
 }
  to{
     -o-transform: rotate(359deg)
 }
}
@keyframes rotate{
 from{
     transform: rotate(0deg)
 }
  to{
     transform: rotate(359deg)
 }
}
.cardInfo *{
  color: black !important;
}
</style>`);

const cardContainer = $(`<div style="position: absolute; top: 0; left: 0" />`);
$("body").append(cardContainer);

let cardId = -1;

const loadCard = (baseNode: Node) => {
  $(baseNode).find("a").filter((_index, element) => {
    const uid = getUID($(element).attr("href"));
    if (uid < 0) return false;
    if ($(element).parents(".user-nav").length > 0) // check parents to see if it's at the header
      return false;
    const markUID = $(element).attr("uid"); // check attr "uid" to avoid multiple rendering
    if (markUID === undefined) {
      $(element).attr("uid", uid); // set attr "uid" to avoid multiple rendering
      return true;
    }
    if (Number(markUID) === uid)
      return false;
    $(element).attr("uid", uid); // set attr "uid" to avoid multiple rendering
    return true;
  }).each((_index, element) => {
    ++ cardId;
    $(element).attr("cardid", cardId);
    const container = $(`<div cardid=${cardId} />`);
    cardContainer.append(container);
    const uid = Number($(element).attr("uid"));
    render(<CardLoader uid={uid} id={cardId}/>, container[0]);
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
