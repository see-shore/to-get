import React, { useEffect, useState } from 'react';
import {
  StyledTitle,
  Button,
  ButtonContainer,
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

const plastic = [
  { id: 1, name: 'one', number: '1' },
  { id: 2, name: 'two', number: '2' },
  { id: 3, name: 'three', number: '3' },
  { id: 4, name: 'three', number: '3' },
  { id: 5, name: 'three', number: '3' },
  { id: 6, name: 'three', number: '3' },
];

function ThanksModal() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
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
  );
}

export default ThanksModal;
