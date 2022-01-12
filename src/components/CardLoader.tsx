import React, { CSSProperties, useState } from "react";
import { Card } from ".";
import $ from "jquery";

let floatNumber = 2000100;

const MAX_WIDTH = document.body.clientWidth;

const INLINE_STYLE: CSSProperties = {
  display: "inline"
};

const getUID = (raw: string): number => {
  return Number($(raw).attr("href").substring(6));
};

export const CardLoader = (props: { init: string }) => {
  floatNumber += 100;
  const cardStyle: CSSProperties = {
    position: "absolute",
    "zIndex": floatNumber,
    top: 100,
    left: 100
  };

  const [isCardDisplay, setCard] = useState(false);
  const [realCardStyle, setStyle] = useState(cardStyle);
  let cardTimeout: NodeJS.Timer = null;

  const mouseEnter = (e: any) => {
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    } else {
      cardTimeout = setTimeout(() => {
        cardStyle.top = e.nativeEvent.layerY + 70;
        cardStyle.left = e.nativeEvent.layerX - 150;
        const delta = e.clientX + 193 - MAX_WIDTH;
        if (delta > 0) cardStyle.left -= delta;
        setStyle(cardStyle);
        setCard(true);
        cardTimeout = null;
      }, 750);
    }
  };

  const mouseLeave = () => {
    if (isCardDisplay) {
      cardTimeout = setTimeout(() => {
        setCard(false);
        cardTimeout = null;
      }, 750);
    } else {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    }
  };

  const uid = getUID(props.init);

  return (
    <div style={INLINE_STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div style={INLINE_STYLE} dangerouslySetInnerHTML={{ __html: props.init }} />
      {isCardDisplay && <div style={realCardStyle}><Card id={uid} /></div>}
    </div>
  );
};
