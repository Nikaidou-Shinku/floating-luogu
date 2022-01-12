import React, { useState } from "react";
import { Card } from ".";

export const CardLoader = (props: { init: string }) => {
  const INLINE_STYLE = {
    display: "inline"
  };
  const CARD_STYLE = {
    
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
      }, 1000);
    }
  };

  const mouseLeave = () => {
    if (isCardDisplay) {
      cardTimeout = setTimeout(() => {
        setCard(false);
        cardTimeout = null;
      }, 1000);
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
