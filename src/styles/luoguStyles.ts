import { CSSProperties } from "react";
import { ColorTable } from "../interfaces/types";

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

export const LG_FG = (color: string) => {
  const styleColor = color === "blue" ? "bluelight" : color;
  return {
    color: COLORS[styleColor as keyof ColorTable]
  };
};

export const LG_BG = (color: string) => {
  const styleColor = color === "blue" ? "bluelight" : color;
  return {
    backgroundColor: COLORS[styleColor as keyof ColorTable]
  };
};
