import React from "react";

export const Card = (props: { id: number }) => {
  return (
    <div>
      <h1>Hello, {props.id}!</h1>
    </div>
  );
};
