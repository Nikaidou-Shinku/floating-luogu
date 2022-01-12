import React, { useState } from "react";
import { Card } from ".";

export const CardLoader = (props: { init: string }) => {
  const STYLE = {
    display: "inline"
  };

  const [mouseOn, setMouse] = useState(false);

  const mouseEnter = () => {
    setMouse(true);
    console.log(props.init, "In");
  };

  const mouseLeave = () => {
    setMouse(false);
    console.log(props.init, "Out");
  };

  return (
    <div style={STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <a dangerouslySetInnerHTML={{ __html: props.init }} />
      {mouseOn && <Card id={126486} />}
    </div>
    // <a onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    //   {mouseOn && <Card id={126486} />}
    // </a>
  );
};
