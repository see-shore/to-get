import React from 'react';
import {
  StyledTitle,
  Button,
  ButtonContainer,
  StyledButton,
  SecHeading,
  EnvText,
  StyledDialog,
  StyledDialogContent,
  PlasticContainer,
  ItemContainer,
  TempImage,
  ItemName,
  ItemNum,
} from '../../styles/components/ThanksDialog.styled';
import styles from '../../styles/components/CartDialogButton.json';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const plastic = [
  { id: 1, name: 'one', number: '1' },
  { id: 2, name: 'two', number: '2' },
  { id: 3, name: 'three', number: '3' },
  { id: 4, name: 'three', number: '3' },
  { id: 5, name: 'three', number: '3' },
  { id: 6, name: 'three', number: '3' },
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
        return (
          <ItemContainer key={item.id}>
            <TempImage />
            <ItemName>{item.name}</ItemName>
            <ItemNum>{item.number}</ItemNum>
          </ItemContainer>
        );
      });

  const generateInspoText = () => {
    return 'You have saved turtles from swallowing bags corals from etc etc.';
  };

  return (
    <>
      {loading ? (
        <div style={styles.button}>
          <CircularProgress size={17} />
        </div>
      ) : (
        <StyledButton onClick={() => handleOrderSubmit()}>{buttonCopy}</StyledButton>
      )}
      <StyledDialog open={open} fullWidth>
        <StyledTitle>Thanks</StyledTitle>
        <SecHeading>By getting things together we can reduce our impact.</SecHeading>
        <StyledDialogContent>
          <PlasticContainer>{generatePlasticMon(plastic)}</PlasticContainer>
          <EnvText>{generateInspoText()}</EnvText>
          <ButtonContainer>
            <Button onClick={handleClose}>Finish</Button>
          </ButtonContainer>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ThanksDialog;
