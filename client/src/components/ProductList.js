import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styled from 'styled-components';

const product_data = require('../tempdata/tempproducts.json');

const TempProductItem = styled.div`
  margin: 2em 1.5em;
`;

const ProductName = styled.h2``;

const TempProductImage = styled.div`
  background: #e8e8e8;
  width: 100px;
  height: 120px;
  margin-bottom: 1em;
`;

const ListContainer = styled.div`
  display: flex;
  margin: 1em 4em;
  flex-wrap: wrap;
`;

const BoxStyle = styled(Box)`
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  padding: 2em;
`;

function ProductList() {
  const [open, setOpen] = useState(false);
  const [currItem, setCurrItem] = useState({});

  const handleOpen = (item) => {
    console.log('item', item);
    setOpen(true);
    setCurrItem(item);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <BoxStyle>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {currItem.name}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            product description
          </Typography>
        </BoxStyle>
      </Modal>
      <ListContainer>
        {product_data.map((item) => (
          // <Link to={'/products/' + item.slug} state={{ selected: item }} className='linkStyle'>
          <TempProductItem onClick={() => handleOpen(item)}>
            <TempProductImage />
            <ProductName>{item.name}</ProductName>
          </TempProductItem>
          // </Link>
        ))}
      </ListContainer>
    </div>
  );
}

export default ProductList;
