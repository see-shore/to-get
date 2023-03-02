import styled from 'styled-components';
import { Dialog, DialogContent } from '@mui/material';

export const StyledTitle = styled.h2`
  font-size: 2.4rem;
  padding: 1em 0 0.3em 0;
`;

export const Button = styled.button`
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0.6em;
  border: transparent;
  background: #b5b7bc;
  border-radius: 20px;
  width: 60%;
  position: absolute;
  bottom: 2em;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SecHeading = styled.h2`
  font-size: 1.8rem;
`;

export const EnvText = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 1em;
`;

export const StyledDialogContent = styled(DialogContent)`
  min-height: 250px;
  padding: 20px 0 !important;
`;

export const StyledDialog = styled(Dialog)`
  padding: 1em;
  div[role='dialog'] {
    padding: 0 3em 7.5em;
  }
`;

export const PlasticContainer = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;

  & {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

export const ItemContainer = styled.div`
  text-align: center;
`;

export const TempImage = styled.div`
  background: #e6e6e6;
  width: 60px;
  height: 70px;
`;

export const ItemName = styled.p``;
export const ItemNum = styled.p``;
