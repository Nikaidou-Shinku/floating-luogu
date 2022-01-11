import React from "react";
import { Hello } from "./components/Hello";
import $ from "jquery";
import { render } from "react-dom";

$(".lg-index-content").prepend(`<div class="am-g" id="user-card-app" />`);
render(<Hello />, document.getElementById("user-card-app"));
