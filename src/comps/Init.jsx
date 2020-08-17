import React, { useContext, useEffect, Fragment } from 'react';
import SynthContext from '../context/synth/synthContext';

const Init = () => {
  const synthContext = useContext(SynthContext);
  const {
    audioCtx,
    modulator,
    modGain,
    carrier,
    masterGain,
    analyser,
  } = synthContext;

  useEffect(() => {
    if (audioCtx !== null) {
      synthContext.createAnalyser(audioCtx);
      synthContext.createModulator(audioCtx);
      synthContext.createCarrier(audioCtx);
      synthContext.createModGain(audioCtx);
      synthContext.createMasterGain(audioCtx);
    }
    // eslint-disable-next-line
  }, [audioCtx]);

  useEffect(() => {
    if (modulator && modGain && carrier && masterGain && analyser) {
      modulator.connect(modGain);
      modGain.connect(carrier.frequency);

      carrier.connect(masterGain);
      masterGain.connect(analyser);
      analyser.connect(audioCtx.destination);

      modulator.start();
      carrier.start();
    }
    // eslint-disable-next-line
  }, [modulator, modGain, carrier, masterGain, analyser]);

  return (
    <Fragment>
      {!audioCtx && <button onClick={() => synthContext.createAudioCtx()} />}
    </Fragment>
  );
};

export default Init;
