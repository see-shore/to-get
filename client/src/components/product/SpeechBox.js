import React from 'react';

const style = {
  backgroundColor: "#C4C4C4",
  width: 180,
  height: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

function SpeechBox() {
  return (
    <div>
      <div style={style}>
        <div style={{ justify: "center" }}>
          <p>Speech text from</p>
          <p>Avatar</p>
        </div>
      </div>
    </div>
  );
}

export default SpeechBox;
