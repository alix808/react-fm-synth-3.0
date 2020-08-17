import React, { useContext, useEffect, useState } from 'react';
import SynthContext from '../context/synth/synthContext';

const ModulatorFreq = () => {
  const synthContext = useContext(SynthContext);
  const { modulator, audioCtx } = synthContext;

  const [freq, setFreq] = useState(176);

  const onChange = (e) => {
    setFreq(e.target.value);
  };

  useEffect(() => {
    if (audioCtx && modulator) {
      modulator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    }
    // eslint-disable-next-line
  }, [freq]);

  if (!audioCtx) {
    return null;
  }

  return (
    <input
      type={'range'}
      min={40}
      max={200}
      defaultValue={freq}
      onChange={(e) => onChange(e)}
    />
  );
};

export default ModulatorFreq;
