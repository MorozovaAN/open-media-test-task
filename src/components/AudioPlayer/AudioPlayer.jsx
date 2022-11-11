import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFormatTime } from '../../helpers/getFormatTime';
import './AudioPlayer.css';

export const AudioPlayer = ({ audio }) => {
  const isAudio = audio.currentSrc;
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [backgroundSize, setBackgroundSize] = useState('25% 100%');
  const volumeStep = 0.05;

  useEffect(() => {
    if (!isAudio) setLoaded(true);

    const handlerSetLoaded = () => setLoaded(true);
    const handlerSetPlaying = () => setPlaying(false);
    const handlerSetCurrentTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', handlerSetLoaded);
    audio.addEventListener('ended', handlerSetPlaying);
    audio.addEventListener('timeupdate', handlerSetCurrentTime);

    return () => {
      audio.removeEventListener('loadeddata', handlerSetLoaded);
      audio.removeEventListener('ended', handlerSetPlaying);
      audio.removeEventListener('timeupdate', handlerSetCurrentTime);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handlerPlayPause = () => {
    setPlaying(() => {
      playing ? audio.pause() : audio.play();
      return !playing;
    });
  };

  const handlerChangeVolume = (e) => {
    const value = e.currentTarget.value;
    audio.volume = value;
    setVolume(value);
    setBackgroundSize((value / volumeStep) * 6 + `% 100%`);
  };

  const btnClasses = playing
    ? 'player-btn player-btn--pause'
    : 'player-btn player-btn--play';
  const audioClasses = loaded ? 'player-box' : 'player-box  loader';

  return (
    <div className="player-wrapper player">
      {audio.currentSrc ? (
        <a
          href={audio.currentSrc}
          className="player__source source"
          title="Download "
        >
          {audio.currentSrc}
        </a>
      ) : (
        <p className="player__source source">no audio source</p>
      )}

      <div className={audioClasses}>
        <button
          className={btnClasses}
          onClick={handlerPlayPause}
          disabled={!isAudio || (isAudio && !loaded)}
        ></button>

        <div className="player__time-volume-box time-volume-box">
          <span className="time-volume-box__time time">
            {getFormatTime(currentTime)}
          </span>

          <input
            className="time-volume-box__volume volume"
            type="range"
            min="0"
            max="0.8"
            step={volumeStep}
            value={volume}
            onInput={handlerChangeVolume}
            style={{ backgroundSize: `${backgroundSize}` }}
          />
        </div>
      </div>
      <Link className="player__btn-back btn-back" to="/">
        Back
      </Link>
    </div>
  );
};
