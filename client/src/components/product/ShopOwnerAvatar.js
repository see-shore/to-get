import React from 'react';

const style = {
  backgroundColor: "#C4C4C4",
  width: 150,
  height: 150,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

function ShopOwnerAvatar() {
  return (
    <div style={style}>
      <div style={{ justify: "center" }}>
        <p>Shop Owner</p>
        <p>Avatar</p>
      </div>
    </div>
  );
}

export default ShopOwnerAvatar;
