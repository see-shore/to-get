import React from 'react';
import { UserContainer, ProfileContainer, ProfileTiles, UserText } from '../../styles/components/OnlineUsers.styled';

export const users = [
  { id: 1, name: 'Bob', image: 1 },
  { id: 2, name: 'Alice', image: 2 },
  { id: 3, name: 'Eve', image: 3 },
  { id: 4, name: 'Steve', image: 4 },
];

function OnlineUsers({ type = 'thanks' }) {
  const p_page = type === 'product' ? true : false;
  return (
    <UserContainer style={{ display: users.length == 0 ? 'none' : 'auto', alignItems: p_page ? 'end' : 'center' }}>
      <ProfileContainer>
        {users
          .filter((_, idx) => idx < 4)
          .map((user) => (
            <ProfileTiles key={user.id} src={require(`../../images/profiles/${user.image}.png`)} />
          ))}
      </ProfileContainer>
      <UserText style={{ textAlign: p_page ? 'end' : 'start' }}>
        {(users.length > 2 && `${users[0].name}, ${users[1].name}, and +${users.length - 2} more are here too!`) ||
          (users.length > 1 && `${users[0].name} and ${users[1].name} are here too!`) ||
          (users.length == 1 && `${users[0].name} is here too!`)}
      </UserText>
    </UserContainer>
  );
}

export default OnlineUsers;
