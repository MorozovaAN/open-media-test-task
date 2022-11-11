import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
import { Input } from './components/Input/Input';

export const App = () => {
  const [audio] = useState(new Audio());
  audio.src =
    'https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals';

  const setAudioURL = (url) => {
    audio.src = url;
  };

  return (
    <div className="app-wrapper">
      <Routes>
        {/* <Route path={'/'} element={<Input setAudioURL={setAudioURL} />} /> */}
        <Route path={'/'} element={<AudioPlayer audio={audio} />} />
      </Routes>
    </div>
  );
};
