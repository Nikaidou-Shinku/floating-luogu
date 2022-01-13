import React, { CSSProperties, useState } from "react";
import { Card } from ".";
import $ from "jquery";

const INLINE_STYLE: CSSProperties = {
  display: "inline"
};

const getUID = (raw: string): number => {
  return Number($(raw).attr("href").substring(6));
};

let floatNumber = 2000100;

const getCardStyle = (pos: { x: number, y: number }) => {
  floatNumber += 100;

  const baseStyle: CSSProperties = {
    position: "absolute",
    "zIndex": floatNumber,
    top: 0,
    left: 0
  };

  const MAX_WIDTH = document.body.clientWidth;
  const deltaRight = pos.x + 169 - MAX_WIDTH;
  const deltaLeft = 218 - pos.x;
  baseStyle.top = pos.y + 20;
  baseStyle.left = pos.x - 150;
  if (deltaRight > 0) baseStyle.left -= deltaRight;
  if (deltaLeft > 0) baseStyle.left += deltaLeft;

  return baseStyle;
};

export const CardLoader = (props: { init: string, id: number }) => {
  const [isCardDisplay, setCard] = useState(false);
  const [realCardStyle, setStyle] = useState<CSSProperties>(null);

  let cardTimeout: NodeJS.Timer = null;

  const mouseEnter = (e: any) => {
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    } else {
      cardTimeout = setTimeout(() => {
        const cardStyle = getCardStyle({ x: e.pageX, y: e.pageY });
        setStyle(cardStyle);
        setCard(true);
        cardTimeout = null;
      }, 500);
    }
  };

  const mouseLeave = () => {
    if (isCardDisplay) {
      cardTimeout = setTimeout(() => {
        setCard(false);
        cardTimeout = null;
      }, 500);
    } else {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    }
  };

  $(`[cardid=${props.id}]`)
    .off("mouseenter").on("mouseenter", mouseEnter)
    .off("mouseleave").on("mouseleave", mouseLeave);

  const uid = getUID(props.init);
  
  return (
    <div style={INLINE_STYLE}>
      {isCardDisplay && <div style={realCardStyle}><Card id={uid} /></div>}
    </div>
  );
};
