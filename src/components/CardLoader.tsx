import React, { CSSProperties, useState } from "react";
import { Card } from ".";

let floatNumber = 2000100;

export const CardLoader = (props: { init: string }) => {
  floatNumber += 100;
  const INLINE_STYLE = {
    display: "inline"
  };
  const CARD_STYLE: CSSProperties = {
    position: "absolute",
    "zIndex": floatNumber
  };

  const [isCardDisplay, setCard] = useState(false);
  let cardTimeout: NodeJS.Timer = null;

  const mouseEnter = () => {
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    } else {
      cardTimeout = setTimeout(() => {
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

  return (
    <div style={INLINE_STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div style={INLINE_STYLE} dangerouslySetInnerHTML={{ __html: props.init }} />
      {isCardDisplay && <div style={CARD_STYLE}><Card id={126486} /></div>}
    </div>
  );
};
