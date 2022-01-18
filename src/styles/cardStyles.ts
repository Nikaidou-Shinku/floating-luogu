import { CSSProperties } from "react";

export const $CSS = (styles: CSSProperties[]): CSSProperties => {
  let ans = {};
  styles.forEach((item) => { ans = Object.assign(ans, item); });
  return ans;
};

export const CARD_STYLE: CSSProperties = {
  width: 300,
  borderRadius: 5,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 0 5px 1px #999",
  background: "#fff",
  color: "black",
  fontFamily: `-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC", "Segoe UI", "Microsoft YaHei", sans-serif`,
  fontWeight: "bold",
  textAlign: "center",
  textSizeAdjust: "100%",
  lineHeight: "25.6px",
  textDecoration: "none",
  fontSize: "16px"
};

export const CARD_CONTAINER_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left"
};

export const CARD_HEADER_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  position: "relative",
  height: 52
};

export const ROTATION_STYLE = `
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

.problemStatusBar div{
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translate(-50%, 0%);
  opacity: 0;
  transition: 0.2s;
  font-size: 8px;
  border-radius: 5px;
  padding: 2px 4px;
  color: white;
  pointer-events: none;
  line-height: 14px;
}
.problemStatusBar:hover div{
  transform: translate(-50%, -100%);
  opacity: 1;
}
`.trim();
