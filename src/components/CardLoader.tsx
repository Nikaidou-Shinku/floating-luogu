import React, { CSSProperties, useState } from "react";
import { Card } from ".";
import $ from "jquery";

let floatNumber = 2000100;

const INLINE_STYLE = {
  display: "inline"
};

const getUID = (raw: string): number => {
  return Number($(raw).attr("href").substring(6));
};

export const CardLoader = (props: { init: string }) => {
  floatNumber += 100;
  const cardStyle: CSSProperties = {
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

  const uid = getUID(props.init);

  return (
    <div style={INLINE_STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div style={INLINE_STYLE} dangerouslySetInnerHTML={{ __html: props.init }} />
      {isCardDisplay && <div style={cardStyle}><Card id={uid} /></div>}
    </div>
  );
};
