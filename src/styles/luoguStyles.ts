import { CSSProperties } from "react";
import { ColorTable } from "../data/interfaces/types";

export const defaultBackgroundURL = "https://cdn.luogu.org/images/bg/fe/DSCF0530-shrink.jpg";
export const bannedUserAvatar = "https://cdn.luogu.com.cn/images/banned.png";

export const AM_BADGE_STYLE: CSSProperties = {
  display: "inline-block",
  minWidth: "10px",
  padding: ".25em .625em",
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#fff",
  lineHeight: 1,
  verticalAlign: "baseline",
  whiteSpace: "nowrap",
  backgroundColor: "#999"
};

export const AM_RADIUS_STYLE: CSSProperties = { borderRadius: "2px" };

const COLORS: ColorTable = {
  purple: "#8e44ad",
  red: "#e74c3c",
  orange: "#e67e22",
  green: "#5eb95e",
  bluelight: "#0e90d2",
  gray: "#bbb",
  brown: "#996600"
};

export const LG_FG = (color: string): CSSProperties => {
  let styleColor = color;
  if (styleColor === "blue")
    styleColor = "bluelight";
  if (styleColor === "cheater")
    styleColor = "brown";
  return { color: COLORS[styleColor as keyof ColorTable] };
};

export const LG_BG = (color: string): CSSProperties => {
  let styleColor = color;
  if (styleColor === "blue")
    styleColor = "bluelight";
  if (styleColor === "cheater")
    styleColor = "brown";
  return { backgroundColor: COLORS[styleColor as keyof ColorTable] };
};

export const LG_FL = (color: string) => {
  let styleColor = color;
  if (styleColor === "blue")
    styleColor = "bluelight";
  if (styleColor === "cheater")
    styleColor = "brown";
  return { fill: COLORS[styleColor as keyof ColorTable] };
};
