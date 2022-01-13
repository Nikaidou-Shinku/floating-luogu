import React, { CSSProperties, useState } from "react";
import { Card } from ".";
import $ from "jquery";

let floatNumber = 2000100;

const INLINE_STYLE: CSSProperties = {
  display: "inline"
};

const getUID = (raw: string): number => {
  return Number($(raw).attr("href").substring(6));
};

export const CardLoader = (props: { init: string, cardid: number }) => {
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
        cardStyle.top = e.pageY + 20;
        cardStyle.left = e.pageX - 150;
        const delta = e.clientX + 193 - document.body.clientWidth;
        const delta2 = 200 - e.clientX;
        if (delta > 0) cardStyle.left -= delta;
        if (delta2 > 0) cardStyle.left += delta2;
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

  const uid = getUID(props.init);
  $(`[cardid=${props.cardid}]`).off("mouseenter").off("mouseleave")
    .on("mouseenter", mouseEnter).on("mouseleave", mouseLeave);
  // onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}
  return (
    <div style={INLINE_STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {isCardDisplay && <div style={realCardStyle}><Card id={uid} /></div>}
    </div>
  );
};
