import React, { useContext } from 'react';
import SynthContext from '../context/synth/synthContext';

const Note = ({ frequency }) => {
  const synthContext = useContext(SynthContext);

  const { audioCtx, attack, release, carrier, masterGain } = synthContext;

  const onClick = () => {
    checkAudioCtx();
    carrier.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    let now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(1, now + attack);
    masterGain.gain.linearRampToValueAtTime(0, now + attack + release * 5);
  };

  const checkAudioCtx = () => {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  if (!audioCtx) {
    return null;
  }

  return <button onClick={() => onClick()}></button>;
};

export default Note;
