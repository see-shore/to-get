import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1em 0.5em;
  border: 2px solid black;
  border-radius: 1em;
  position: relative;
  background: #f0d79447;
`;

export const ImageContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  position: relative;
`;

export const CircleImage = styled.img`
  position: absolute;
  top: 45%;
  left: 36%;
  height: auto;
  width: 10em;
  transform: translateX(-50%) translateY(-50%);
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.6rem;
  margin-left: 0.5em;
  & div {
    margin-bottom: 0.5em;
  }
`;

export const StyledName = styled.p`
  font-size: 1.7rem;
  margin-top: 0.2em;
`;
export const UnitPrice = styled.p`
  color: #757571;
  font-size: 1.4rem;
`;

export const ButtonContainer = styled.div`
  position: relative;
  margin: -0.1em -0.5em -0.2em;
  font-size: 1.8rem;

  & svg {
    color: black;
    font-size: 1.5rem;
  }

  & div > button {
    background-color: #f0d79478;
    width: 2em;
    height: 2em;
    border-radius: 0.5em;
  }
`;

export const ItemCount = styled.p`
  width: 2em;
  text-align: center;
`;

export const ItemControl = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  bottom: 0;
  align-items: center;
  padding: 0.3em;
`;
