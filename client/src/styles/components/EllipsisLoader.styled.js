import styled, { keyframes } from 'styled-components';

const circleOne = keyframes`  
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const circleTwo = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const circleThree = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

export const LoadingContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 13px;
  scale: ${(props) => (props.size ? props.size : 1)};
  div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => (props.color ? props.color : 'black')};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    :nth-child(1) {
      left: 8px;
      animation: ${circleOne} 0.8s infinite;
    }
    :nth-child(2) {
      left: 8px;
      animation: ${circleTwo} 0.8s infinite;
    }
    :nth-child(3) {
      left: 32px;
      animation: ${circleTwo} 0.8s infinite;
    }
    :nth-child(4) {
      left: 56px;
      animation: ${circleThree} 0.8s infinite;
    }
  }
`;
