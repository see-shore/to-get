import React from 'react';

import SpeechBubble from '../../images/speech-bubble.png';
import styles from '../../styles/components/SpeechBox.json';

function SpeechBox() {
  return (
    <div style={styles.container}>
      <img src={SpeechBubble} alt="Speech Bubble" style={styles.image} />
    </div>
  );
}

export default SpeechBox;
