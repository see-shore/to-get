import React from 'react';
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
  ItemName,
  ItemNum,
  ProfileContainer,
  ProfileTiles,
  UserText,
  UserContainer,
} from '../../styles/components/ThanksDialog.styled';
import styles from '../../styles/components/CartDialogButton.json';
import dialogStyles from '../../styles/components/CartDialog.json';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const plastic = [
  { id: 1, name: 'bag', amt: '8', unit: 'grams', type: 'plastic bags' },
  { id: 2, name: 'clamshell', amt: '6', unit: 'grams', type: 'plastic container' },
  { id: 3, name: 'net', amt: '4', unit: 'grams', type: 'swallowing bags' },
  { id: 4, name: 'bag', amt: '8', unit: 'grams', type: 'plastic container' },
  { id: 5, name: 'bag', amt: '8', unit: 'grams', type: 'plastic container' },
  { id: 6, name: 'bag', amt: '8', unit: 'grams', type: 'plastic container' },
];

const users = [
  { id: 1, name: 'Bob', image: 1 },
  { id: 2, name: 'Alice', image: 2 },
  { id: 3, name: 'Eve', image: 3 },
  { id: 3, name: 'Steve', image: 4 },
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
            <Image src={require(`../../images/plastic/${item.name}.png`)} />
            <ItemName>
              {item.amt} {item.unit}
            </ItemName>
            <ItemNum>{item.type}</ItemNum>
          </ItemContainer>
        );
      });

  const displayCurrUsers = (users) => {
    return (
      <>
        <ProfileContainer>
          {users
            .filter((_, idx) => idx < 5)
            .map((user) => (
              <ProfileTiles src={require(`../../images/profiles/${user.image}.png`)} />
            ))}
        </ProfileContainer>
        <UserText>
          {(users.length > 2 && `${users[0].name}, ${users[1].name}, and +${users.length - 2} more are here too!`) ||
            (users.length > 1 && `${users[0].name} and ${users[1].name} are here too!`) ||
            (users.length == 1 && `${users[0].name} is here too!`)}
        </UserText>
      </>
    );
  };

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
          <UserContainer style={{ display: users.length == 0 ? 'none' : 'auto' }}>
            {displayCurrUsers(users)}
          </UserContainer>
          <Button className={'styled-button'} onClick={handleClose}>
            Finish
          </Button>
        </StyledDialogContent>
      </StyledDialog>
    </>
  );
}

export default ThanksDialog;
