import React from 'react';
import { useSelector } from 'react-redux';
import { UserContainer, ProfileContainer, ProfileTiles, UserText } from '../../styles/components/OnlineUsers.styled';

function OnlineUsers({ type = 'thanks' }) {
  const p_page = type === 'product' ? true : false;
  const recentUsers = useSelector((state) => state.users.recentUsers);
  const recentUserCount = recentUsers.length;
  
  return (
    <UserContainer style={{ alignItems: p_page ? 'end' : 'center' }}>
      <ProfileContainer>
        {recentUsers
          .filter((_, idx) => idx < 4)
          .map((user) => (
            <ProfileTiles key={user.id} src={user.imageUrl} />
          ))}
      </ProfileContainer>
      <UserText style={{ textAlign: p_page ? 'end' : 'start' }}>
        {(recentUserCount > 2 && `${recentUsers[0].firstName}, ${recentUsers[1].firstName}, and +${recentUserCount - 2} more are here too!`) ||
          (recentUserCount > 1 && `${recentUsers[0].firstName} and ${recentUsers[1].firstName} are here too!`) ||
          (recentUserCount === 1 && `${recentUsers[0].firstName} is here too!`)}
      </UserText>
    </UserContainer>
  );
}

export default OnlineUsers;
