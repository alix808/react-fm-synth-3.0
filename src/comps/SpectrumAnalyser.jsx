import React, { useContext, useEffect, useRef } from 'react';
import SynthContext from '../context/synth/synthContext';

const SpectrumAnalyser = () => {
  const synthContext = useContext(SynthContext);
  const { analyser } = synthContext;
  const oscilloscope = useRef('');

  const createWaveForm = (analyser) => {
    return new Float32Array(analyser.frequencyBinCount);
  };

  function updateWaveform(waveform, analyser) {
    requestAnimationFrame(() => updateWaveform(waveform, analyser));
    analyser.getFloatTimeDomainData(waveform);
  }

  function drawOscilloscope(scopeContext, scopeCanvas, waveform) {
    requestAnimationFrame(() =>
      drawOscilloscope(scopeContext, scopeCanvas, waveform)
    );
    scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
    scopeContext.beginPath();
    for (let i = 0; i < waveform.length; i++) {
      const x = i;
      const y = (0.5 + waveform[i] / 2) * scopeCanvas.height;
      if (i === 0) {
        scopeContext.moveTo(x, y);
      } else {
        scopeContext.lineTo(x, y);
      }
    }
    scopeContext.stroke();
  }

  useEffect(() => {
    if (analyser !== null) {
      const waveform = createWaveForm(analyser);
      analyser.getFloatTimeDomainData(waveform);
      updateWaveform(waveform, analyser);

      const scopeCanvas = oscilloscope.current;
      scopeCanvas.width = waveform.length;
      scopeCanvas.height = 200;
      const scopeContext = scopeCanvas.getContext('2d');
      scopeContext.strokeStyle = '#7efbec';
      drawOscilloscope(scopeContext, scopeCanvas, waveform);
    }

    // eslint-disable-next-line
  }, [analyser]);
  return <canvas ref={oscilloscope}></canvas>;
};

export default SpectrumAnalyser;
