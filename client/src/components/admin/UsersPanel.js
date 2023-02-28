import React from 'react';
import { useSelector } from 'react-redux';
import UserBlock from './UserBlock';

function UsersPanel() {
  const users = useSelector((state) => state.users.users);

  return (
    <>
      {users.map((user) => (
        <UserBlock key={user.id} user={user}/>
      ))}
    </>
  );
}

export default UsersPanel;
