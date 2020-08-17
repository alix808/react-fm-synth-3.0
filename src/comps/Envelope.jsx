import React, { useContext, Fragment } from 'react';
import SynthContext from '../context/synth/synthContext';

const Envelope = () => {
  const synthContext = useContext(SynthContext);

  const onAttack = (e) => {
    let x = Number(e.target.value);
    synthContext.setAttack(x);
  };

  const onRelease = (e) => {
    let x = Number(e.target.value);
    synthContext.setRelease(x);
  };

  if (!synthContext.audioCtx) {
    return null;
  }

  return (
    <Fragment>
      <input
        type={'range'}
        min={0.1}
        max={1}
        step={0.1}
        defaultValue={1}
        onChange={(e) => onAttack(e)}
      />
      <input
        type={'range'}
        min={0.1}
        max={1}
        step={0.1}
        defaultValue={1}
        onChange={(e) => onRelease(e)}
      />
    </Fragment>
  );
};

export default Envelope;
