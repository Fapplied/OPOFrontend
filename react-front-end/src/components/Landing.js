import React from "react";
import "../App.css";
import CustomCarousel from "./carousel/Carousal";
import TitleMessage from "./title-message/TitleMessage";
// import About from "../../importReact/React-Portfolio/src/views/about/About";
import { Parallax } from "react-parallax";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import Container from "react-bootstrap/Container";
import { height } from "@mui/system";

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
