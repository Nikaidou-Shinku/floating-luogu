import { CSSProperties } from "react";
import { ColorTable } from "../data/interfaces/types";

export const defaultBackgroundURL = "https://cdn.luogu.org/images/bg/fe/DSCF0530-shrink.jpg";
export const bannedUserAvatar = "https://cdn.luogu.com.cn/images/banned.png";

export const BADGE_STYLE: CSSProperties = {
  color: "#fff",
  display: "inline-block",
  padding: "0px 8px",
  boxSizing: "border-box",
  fontWeight: 400,
  lineHeight: "20px",
  borderRadius: "2px",
  fontSize: "14px",
  marginLeft: "5px"
};

const COLORS: ColorTable = {
  purple: "#8e44ad",
  red: "#e74c3c",
  orange: "#e67e22",
  yellow: "#ffc116",
  green: "#5eb95e",
  bluelight: "#0e90d2",
  gray: "#bbb",
  brown: "#996600",
  blue: "#3498db",
  gold: "#f1c40f",
  black: "#0e1d69"
};

const problemColors = [ "gray", "red", "orange", "yellow", "green", "bluelight", "purple", "black" ];

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
  return { fill: COLORS[color as keyof ColorTable] };
};

export const LG_PBG = (id: number): CSSProperties => {
  return { background: COLORS[problemColors[id] as keyof ColorTable] };
};
