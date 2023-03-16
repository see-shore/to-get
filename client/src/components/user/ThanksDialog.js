import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import OnlineUsers from './OnlineUsers';
import dialogStyles from '../../styles/components/CartDialog.json';
import {
  StyledTitle,
  TitleContainer,
  Button,
  SecHeading,
  EnvText,
  StyledDialog,
  StyledDialogContent,
  PlasticContainer,
  ItemContainer,
  Image,
  ItemNum,
} from '../../styles/components/ThanksDialog.styled';

import ImageURLs from '../../images/ImageURLs.json';

const plastic = [
  { id: 1, name: 'bag', amt: '8', unit: 'grams', type: 'plastic bags' },
  { id: 2, name: 'clamshell', amt: '6', unit: 'grams', type: 'plastic containers' },
  { id: 3, name: 'net', amt: '4', unit: 'grams', type: 'swallowing bags' },
  { id: 4, name: 'bag', amt: '8', unit: 'grams', type: 'plastic containers' },
  { id: 5, name: 'bag', amt: '8', unit: 'grams', type: 'plastic containers' },
  { id: 6, name: 'bag', amt: '8', unit: 'grams', type: 'plastic containers' },
];

function ThanksDialog(props) {
  const open = useSelector((state) => state.orders.thanksDialogOpen);
  const loading = useSelector((state) => state.orders.saveOrdersPending);
  const { isEmpty } = props;
  const buttonCopy = isEmpty ? 'Continue Shopping' : 'Confirm Order';

  const handleClose = () => {
    props.onClose();
  };

  const handleOrderSubmit = () => {
    if (!isEmpty) {
      props.onOrderClick();
    }
  };

  const generatePlasticMon = (plastic) =>
    plastic
      .filter((_, idx) => idx < 3)
      .map((item) => {
        const key = "TRASH_" + item.name.toUpperCase();
        return (
          <ItemContainer key={item.id}>
            <Image src={ImageURLs[key]} />
            <ItemNum>{item.type}</ItemNum>
          </ItemContainer>
        );
      });

  const generateInspoText = () => {
    return 'You have saved turtles from swallowing bags corals from etc etc.';
  };

  return (
    <>
      {loading ? (
        <button className={'styled-button'}>
          <CircularProgress size={17} />
        </button>
      ) : (
        <button className={'styled-button'} onClick={() => handleOrderSubmit()}>
          {buttonCopy}
        </button>
      )}
      <StyledDialog open={open} fullWidth PaperProps={dialogStyles.paperStyle}>
        <TitleContainer>
          <StyledTitle>Thank You</StyledTitle>
          <StyledTitle>Your Order is Confirmed</StyledTitle>
        </TitleContainer>
        <SecHeading>By getting things together we can reduce our impact.</SecHeading>
        <StyledDialogContent>
          <PlasticContainer>{generatePlasticMon(plastic)}</PlasticContainer>
          <EnvText>{generateInspoText()}</EnvText>
          <OnlineUsers users={'thanks'} />
          <Button className={'styled-button'} onClick={handleClose}>
            Finish
          </Button>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ThanksDialog;
