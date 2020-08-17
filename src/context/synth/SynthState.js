import React, { useReducer } from 'react';
import SynthContext from './synthContext';
import SynthReducer from './synthReducer';
import {
  CREATE_AUDIO_CTX,
  CREATE_ANALYSER,
  CREATE_MODULATOR,
  CREATE_CARRIER,
  CREATE_MOD_GAIN,
  CREATE_MASTER_GAIN,
  SET_ATTACK,
  SET_RELEASE,
} from '../types';

const SynthState = (props) => {
  const initialState = {
    audioCtx: null,
    analyser: null,
    modulator: null,
    carrier: null,
    modGain: null,
    masterGain: null,
    attack: 1,
    release: 1,
  };

  const [state, dispatch] = useReducer(SynthReducer, initialState);

  const createAudioCtx = () => {
    const audioCtx = new AudioContext();

    dispatch({
      type: CREATE_AUDIO_CTX,
      payload: audioCtx,
    });
  };

  const createAnalyser = (audioCtx) => {
    const analyser = audioCtx.createAnalyser();

    dispatch({
      type: CREATE_ANALYSER,
      payload: analyser,
    });
  };

  const createModulator = (audioCtx) => {
    const modulator = audioCtx.createOscillator();
    modulator.frequency.setValueAtTime(176, audioCtx.currentTime);
    dispatch({
      type: CREATE_MODULATOR,
      payload: modulator,
    });
  };

  const createCarrier = (audioCtx) => {
    const carrier = audioCtx.createOscillator();
    carrier.frequency.value = 44;
    dispatch({
      type: CREATE_CARRIER,
      payload: carrier,
    });
  };

  // modulation depth
  const createModGain = (audioCtx) => {
    const modGain = audioCtx.createGain();
    modGain.gain.value = 40;

    dispatch({
      type: CREATE_MOD_GAIN,
      payload: modGain,
    });
  };

  const createMasterGain = (audioCtx) => {
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;

    dispatch({
      type: CREATE_MASTER_GAIN,
      payload: masterGain,
    });
  };

  const setAttack = (attack) => {
    dispatch({
      type: SET_ATTACK,
      payload: attack,
    });
  };

  const setRelease = (release) => {
    dispatch({
      type: SET_RELEASE,
      payload: release,
    });
  };

  return (
    <SynthContext.Provider
      value={{
        audioCtx: state.audioCtx,
        analyser: state.analyser,
        modulator: state.modulator,
        carrier: state.carrier,
        modGain: state.modGain,
        masterGain: state.masterGain,
        attack: state.attack,
        release: state.release,
        createAnalyser,
        createModulator,
        createAudioCtx,
        createCarrier,
        createModGain,
        createMasterGain,
        setAttack,
        setRelease,
      }}
    >
      {props.children}
    </SynthContext.Provider>
  );
};

export default SynthState;
