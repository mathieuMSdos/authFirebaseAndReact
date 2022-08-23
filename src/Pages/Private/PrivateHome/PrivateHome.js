import React from "react";
import attack from "./attack.gif";

export default function PrivateHome() {
  return (
    <div className="container p-5">
      <h1 className="display-3 text-light mb-4"> Home sweet Private Home</h1>
      <img src={attack} />
    </div>
  );
}
