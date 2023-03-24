import React from 'react';

import ImageURLs from '../../images/ImageURLs.json';
import styles from '../../styles/components/SpeechBox.json';

function SpeechBox({ text = '' }) {
  return (
    <div style={styles.container}>
      <p className={'hide-scroll'} style={styles.text}>
        {text}
      </p>
      <img src={ImageURLs.SPEECH_BUBBLE} alt='Speech Bubble' style={styles.image} />
    </div>
  );
}

export default SpeechBox;
