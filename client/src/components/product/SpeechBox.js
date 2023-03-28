import React from 'react';

import ImageURLs from '../../images/ImageURLs.json';
import CenterSpeechBubble from '../../images/center_chat_bubble.png';
import styles from '../../styles/components/SpeechBox.json';

function SpeechBox({ text = '', dir = 'left' }) {
  const imgSrc = dir === 'center' ? CenterSpeechBubble : ImageURLs.SPEECH_BUBBLE;
  const textStyle = {
    left: { padding: '0.5em 0.5em 1em 2.5em' },
    center: { padding: '0.5em 0.8em 1.8em 0.8em', justifyContent: 'center' },
  };
  return (
    <div style={styles.container}>
      <p className={'hide-scroll'} style={{ ...styles.text, ...(textStyle[dir] || textStyle['left']) }}>
        {text}
      </p>
      <img src={imgSrc} alt='Speech Bubble' style={styles.image} />
    </div>
  );
}

export default SpeechBox;
