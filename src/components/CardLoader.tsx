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
  const [tmpStyle, setTmpStyle] = useState<CSSProperties>(null);
  const [fadeOut, setFadeout] = useState(false);
  const [cardTimeout, setCardTimeout] = useState<NodeJS.Timer>(null);

  const mouseEnter = (e: any) => {
    if (fadeOut)
      return;
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      setCardTimeout(null);
    } else {
      setTmpStyle(getCardStyle({ x: e.pageX, y: e.pageY }));
      setPre(true);
    }
  };

  useEffect(() => {
    if (tmpStyle === null)
      return;
    setStyle(tmpStyle);
    setCardTimeout(setTimeout(() => {
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
      setCardTimeout(null);
    }, 100));
  }, [tmpStyle]);

  const mouseLeave = () => {
    if (fadeOut)
      return;
    if (isCardDisplay) {
      setCardTimeout(setTimeout(() => {
        setFadeout(true);
        setStyle($CSS([
            tmpStyle,
            {
              opacity: 0,
              transition: "0.1s"
            }
          ])
        );
        setTimeout(() => {
          setCard(false);
          setFadeout(false);
          setStyle($CSS([
              tmpStyle, { visibility: "hidden", top: 0, left: 0 }
            ])
          );
        }, 150);
        setCardTimeout(null);
      }, 300));
    } else {
      setPre(false);
      clearTimeout(cardTimeout);
      setCardTimeout(null);
    }
  };

  $(`[cardid=${props.id}]`)
    .off("mouseenter").on("mouseenter", mouseEnter)
    .off("mouseleave").on("mouseleave", mouseLeave);

  return (
    <div style={{ display: "inline" }}>
      { isCardPreDisplay && <div style={realCardStyle}
        onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}><Card id={props.uid} /></div> }
    </div>
  );
};
