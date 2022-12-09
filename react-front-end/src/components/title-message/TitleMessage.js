import React from "react";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
import { ReactComponent as ReactLogo } from "../../OPO.svg";

const MyTitleMessage = styled.h1`
  position: absolute;
  width: 100%;
  top: 16rem;
  z-index: 1;
  margin-top: -125px;
  text-align: center;
  strong {
    font-size: 1.25em;
  }
  
  div {
    color: black;
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    font-weight: 100;
    .main {
      font-size: 50px;
    }
  }
`;

const TitleMessage = () => (
  <MyTitleMessage>
    <div className="titleMessage">
      <div className="heading">
        <div className="main text-center mb-3">
          Hi! Welcome to
          <br />
          <br />
          <ReactLogo style={{ width: "75%" }} />
          <br />
          <br />
        </div>
        <div className="sub">
          <Typewriter
            options={{
              strings: [
                "Can't Make Up Your Mind?",
                "Ask The Community For Help!",
                "Sign In & See Yourself!",
                "What are you waiting for?!",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
          <div
            class="arrow-10"
            style={{
              position: "absolute",
              bottom: "1vh",
              left: "5vw",
              color: "grey",
            }}
          ></div>

          <div
            class="arrow-10"
            style={{
              position: "absolute",
              bottom: "1vh",
              right: "5vw",
              color: "grey",
            }}
          ></div>
        </div>
      </div>
    </div>
  </MyTitleMessage>
);

export default TitleMessage;
