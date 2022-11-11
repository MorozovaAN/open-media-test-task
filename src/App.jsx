import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { Input } from './components/Input/Input';

export const App = () => {
  const [audio] = useState(new Audio());

  const setAudioURL = (url) => {
    audio.src = url;
  };

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path={'/'} element={<Input setAudioURL={setAudioURL} />} />
        <Route path={'/player'} element={<AudioPlayer audio={audio} />} />
      </Routes>
    </div>
  );
};
