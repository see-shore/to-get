import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const PageContainer = styled.div`
  justify-content: center;
  padding-bottom: 26vh;
  max-height: 100vh;
`;

export const StyledLink = styled(Link)`
  max-width: 80%;
  width: 300px;
  margin: 0 auto;
`;

export const AvatarContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin-bottom: 3em;
  & > img {
    margin-right: 3em;
  }
`;
