import React from "react";

import styled, { keyframes } from "styled-components";

const flip = keyframes`
0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}

`;

const Root = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Content = styled.div`
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  background: black;
  box-sizing: border-box;
  border: 32px solid #fdd;
  border-color: #fdd transparent #fdd transparent;
  animation: ${flip} 1.2s infinite;
`;

function LoadingIndicator() {
  return (
    <Root>
      <Content />
    </Root>
  );
}

export default LoadingIndicator;
