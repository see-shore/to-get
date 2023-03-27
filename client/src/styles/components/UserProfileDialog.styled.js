import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  background-color: transparent;
  position: relative;
  & p {
    background-color: #d9d9d9;
  }
  &:after,
  &:before {
    position: absolute;
    opacity: 0;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }
  &:after {
    content: '';
    width: calc(100% + 20px);
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3em;
    z-index: 200;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

export const LogOutButton = styled.button`
  background-color: #000000;
  &:hover {
    background-color: grey;
  }
`;
