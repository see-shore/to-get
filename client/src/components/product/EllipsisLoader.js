import React from 'react';
import { LoadingContainer } from '../../styles/components/EllipsisLoader.styled';

function EllipsisLoader({ color = 'black', size = 'medium' }) {
  const convNum = {
    small: 0.5,
    medium: 1,
    large: 1.5,
  };
  return (
    <LoadingContainer color={color} size={convNum[size] || 1}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingContainer>
  );
}

export default EllipsisLoader;
