import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AudioSrcForm } from './components/AudioSrcForm/AudioSrcForm';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import './App.css';

export const App = () => {
  const [audio, setAudio] = useState(new Audio());

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path={'/'} element={<AudioSrcForm setAudio={setAudio} />} />
        <Route path={'/player'} element={<AudioPlayer audio={audio} />} />
      </Routes>
    </div>
  );
};
