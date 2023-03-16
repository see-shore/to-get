import styled from 'styled-components';
import { Dialog, DialogContent } from '@mui/material';

export const StyledTitle = styled.h2``;

export const TitleContainer = styled.div`
  & h2 {
    font-size: 2rem;
  }
  padding: 2em 0 1em;
  text-align: center;
`;

export const SecHeading = styled.h2`
  font-weight: 500;
  font-size: 1.6rem;
  text-align: center;
`;

export const EnvText = styled(SecHeading)`
  margin-top: 1em;
`;

export const Button = styled.button`
  cursor: pointer;
  position: absolute;
  width: calc(100% - 1em);
  inset: auto 0.5em 1em;
`;

export const StyledDialogContent = styled(DialogContent)`
  min-height: 320px;
  padding: 20px 0 !important;
`;

export const StyledDialog = styled(Dialog)`
  div[role='dialog'] {
    padding: 0 3em 6.5em;
  }
`;

export const PlasticContainer = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
  & div {
    width: 100%;
  }
`;

export const ItemContainer = styled.div`
  text-align: center;
  & p {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

export const Image = styled.img`
  width: 60px;
  height: auto;
  object-fit: cover;
`;

export const ItemName = styled.p``;
export const ItemNum = styled.p`
  color: #72767e;
`;
