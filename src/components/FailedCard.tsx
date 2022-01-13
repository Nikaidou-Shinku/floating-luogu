import React from "react";
import { CARD_STYLE } from "../styles/cardStyles";

const HEAD_STYLE = { marginTop: 20 };

export const FailedCard = () => {
  return (
    <div style={CARD_STYLE}>
      <h2 style={HEAD_STYLE}>加载卡片失败了哦……</h2>
      <h5>试着检查下网络？</h5>
    </div>
  );
};
