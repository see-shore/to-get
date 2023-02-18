import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TempTOC = styled.h1`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2vh 6vh 6vh;
  border: 1px solid black;
  width: fit-content;
  margin: 6vh auto;
`;

function Home() {
  return (
    <div>
      <a className='tempPageSign'>Temp Home Page</a>
      {/* set up temp toc since navigation still unconfirmed */}

      <TempTOC>
        <p style={{ fontWeight: 300, fontSize: 50 }}>Existing Links</p>
        <Link to='/contact'>Contact Page</Link>
        <Link to='/login'>Login Page</Link>
        <Link to='/products'>Product Page</Link>
        <Link to='/confirm-order'>Order Confirmation Page</Link>
        <Link to='/payment'>Payment Page</Link>
        <Link to='/set-price'>Set Price (Admin)</Link>
        <Link to='/nothing'>Broken Link</Link>
      </TempTOC>
    </div>
  );
}
export default Home;
