import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AudioSrcForm } from './components/AudioSrcForm/AudioSrcForm';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import './App.css';

export const App = () => {
  const [audio] = useState(new Audio());
  audio.playload = 'metadata';

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path={'/'} element={<AudioSrcForm audio={audio} />} />
        <Route path={'/player'} element={<AudioPlayer audio={audio} />} />
      </Routes>
    </div>
  );
};
