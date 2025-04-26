import React, { useState, useEffect } from 'react';

/**
 * Typewriter component that reveals text character by character.
 * @param {{ text: string, speed?: number }} props
 */
const Typewriter = ({ text = '', speed = 30 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index += 1;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}</>;
};

export default Typewriter;