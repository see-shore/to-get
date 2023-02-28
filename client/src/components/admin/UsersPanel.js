import React from 'react';
import { useSelector } from 'react-redux';
import UserBlock from './UserBlock';

function UsersPanel() {
  const users = useSelector((state) => state.users.users);

  return (
    <div style={{ margin: "auto auto 15px 45px" }}>
      {users.map((user) => (
        <UserBlock key={user.id} user={user}/>
      ))}
    </div>
  );
}

export default UsersPanel;
