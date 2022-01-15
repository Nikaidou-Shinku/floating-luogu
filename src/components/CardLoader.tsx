import $ from "jquery";
import React, { CSSProperties, useState, useEffect } from "react";
import { $CSS } from "../styles/cardStyles";
import { Card } from ".";

let floatNumber = 2000100;

const getCardStyle = (pos: { x: number, y: number }) => {
  floatNumber += 100;

  const baseStyle: CSSProperties = {
    position: "absolute",
    zIndex: floatNumber,
    opacity: 0,
    top: 0,
    left: 0
  };

  const MAX_WIDTH = document.body.clientWidth;
  const deltaRight = pos.x + 169 - MAX_WIDTH;
  const deltaLeft = 218 - pos.x;
  baseStyle.top = pos.y + 30;
  baseStyle.left = pos.x - 150;
  if (deltaRight > 0) baseStyle.left -= deltaRight;
  if (deltaLeft > 0) baseStyle.left += deltaLeft;

  return baseStyle;
};

export const CardLoader = (props: { uid: number, id: number }) => {
  const [isCardDisplay, setCard] = useState(false);
  const [isCardPreDisplay, setPre] = useState(false);
  const [realCardStyle, setStyle] = useState<CSSProperties>(null);
  const [requestID, setRequestID] = useState(0);

  let cardTimeout: NodeJS.Timer = null;
  let currentObject = <div></div>;

  const mouseEnter = (e: any) => {
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    } else {
      const tmpStyle = getCardStyle({ x: e.pageX, y: e.pageY });
      setStyle(tmpStyle);
      setRequestID(requestID + 1);
      setPre(true);
      cardTimeout = setTimeout(() => {
        const tmpY = (tmpStyle.top as number) - 10;
        const cardStyle = $CSS([
          tmpStyle,
          {
            top: tmpY,
            opacity: 1,
            transition: "0.1s"
          }
        ]);
        setStyle(cardStyle);
        setCard(true);
        cardTimeout = null;
      }, 100);
    }
  };

  const mouseLeave = () => {
    if (isCardDisplay) {
      cardTimeout = setTimeout(() => {
        setStyle({ opacity: 0 });
        setCard(false);
        cardTimeout = null;
      }, 300);
    } else {
      setPre(false);
      clearTimeout(cardTimeout);
      cardTimeout = null;
    }
  };

  $(`[cardid=${props.id}]`)
    .off("mouseenter").on("mouseenter", mouseEnter)
    .off("mouseleave").on("mouseleave", mouseLeave);

  return ( isCardPreDisplay && <div style={{ display: "inline" }}>
      { isCardPreDisplay && <div style={realCardStyle}><Card id={props.uid} requestID={requestID} /></div> }
    </div>)
};
