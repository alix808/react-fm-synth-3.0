import React from 'react';
import SynthState from './context/synth/SynthState';
import Init from './comps/Init';
import Envelope from './comps/Envelope';
import ModulatorFreq from './comps/ModulatorFreq';
import ModulatorDepth from './comps/ModulatorDepth';
import Github from './comps/Github';
import SpectrumAnalyser from './comps/SpectrumAnalyser';
import Grid from './comps/Grid';
import './App.css';

const App = () => (
  <SynthState>
    <section>
      <Init />
      <ModulatorFreq />
      <ModulatorDepth />
      <Envelope />
    </section>
    <SpectrumAnalyser />
    <Grid />
    <Github />
  </SynthState>
);

export default App;
