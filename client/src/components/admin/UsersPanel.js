import React from 'react';
import { useSelector } from 'react-redux';
import AddUserDialog from './AddUserDialog';
import UserBlock from './UserBlock';

function UsersPanel() {
  const users = useSelector((state) => state.users.users);

  return (
    <div>
      <div style={{ margin: "15px auto 15px 45px" }}>
        <AddUserDialog />
      </div>
      {users.map((user) => (
        <div key={user.id} style={{ margin: "auto auto 15px 45px" }}>
          <UserBlock user={user} />
        </div>
      ))}
    </div>

  );
}

export default UsersPanel;
