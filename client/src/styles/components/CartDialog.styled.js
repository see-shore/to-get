import styled from 'styled-components';

import { Dialog as MUIDialog } from '@mui/material';

export const Dialog = styled(MUIDialog)`
  & h2 {
    background: #f0d794;
    border-bottom: dashed black;
    justify-content: center;
    display: flex;
    padding: 0.5em;
    & p {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 1.8rem;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
  & div.MuiDialogContent-root {
    padding: 12px 12px 20px;
  }
`;
