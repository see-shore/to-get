import React from 'react';

function NoImageCard() {
  return (
    <div style={{ 
      width: 300, 
      height: 300, 
      margin: "20px 20px 10px auto",
      backgroundColor: "#C9C9C9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <p style={{ fontWeight: "bold", fontFamily: "helvetica"}}>
        No image available for this item.
      </p>
    </div>
  );
}

export default NoImageCard;
