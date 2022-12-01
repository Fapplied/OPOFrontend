import React from "react";
import "../App.css";
import TitleMessage from "./title-message/TitleMessage";

function Landing() {
  return (
    <div
      className="TitleMessageStuff"
      style={{ position: "relative", height: "800px" }}
    >
      <TitleMessage />
    </div>
  );
}

export default Landing;
