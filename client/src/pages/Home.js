import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TempTOC = styled.h1`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 11vh;
`;

function Home() {
  return (
    <div>
      <a className='tempPageSign'>Temp Home Page</a>
      {/* set up temp toc since navigation still unconfirmed */}
      <TempTOC>
        <Link to='/contact'>Contact Page</Link>
        <Link to='/login'>Login Page</Link>
        <Link to='/confirm-order'>Order Confirmation Page</Link>
        <Link to='/payment'>Payment Page</Link>
        <Link to='/set-price'>Set Price (Admin)</Link>
      </TempTOC>
    </div>
  );
}
export default Home;
