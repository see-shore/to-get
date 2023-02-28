import React from 'react';
import { useSelector } from 'react-redux';

function UsersPanel() {
  const users = useSelector((state) => state.users.users);

  return (
    <>
      {JSON.stringify(users)}
    </>
  );
}

export default UsersPanel;
