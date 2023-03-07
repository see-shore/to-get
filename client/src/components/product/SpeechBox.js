import React from 'react';

import SpeechBubble from '../../images/speech-bubble.png';
import styles from '../../styles/components/SpeechBox.json';

function SpeechBox({ text = '' }) {
  return (
    <div style={styles.container}>
      <p style={styles.text}>{text}</p>
      <img src={SpeechBubble} alt='Speech Bubble' style={styles.image} />
    </div>
  );
}

export default SpeechBox;
