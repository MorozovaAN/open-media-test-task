import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFormatTime } from '../../helpers/getFormatTime';
import { InputRange } from '../common/InputRange/InputRange';
import './AudioPlayer.css';

export const AudioPlayer = ({ audio }) => {
  const isAudio = audio.currentSrc;
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  //const [backgroundSize, setBackgroundSize] = useState('20% 100%');
  const volumeStep = 0.05;

  const [progress, setProgress] = useState(0);
  //const progressMax = Math.round(String(audio.duration));

  useEffect(() => {
    if (!isAudio) setLoaded(true);

    const handlerSetLoaded = () => setLoaded(true);
    const handlerSetPlaying = () => setPlaying(false);
    const handlerSetCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

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

  useEffect(() => {
    setProgress(Math.round(currentTime));
  }, [currentTime]);

  const handlerPlayPause = () => {
    setPlaying(() => {
      playing ? audio.pause() : audio.play();
      return !playing;
    });
  };

  const handlerChangeProgress = (currentValue) => {
    setProgress(currentValue);
    audio.currentTime = currentValue;
  };

  const handlerChangeVolume = (currentValue) => {
    audio.volume = currentValue;
    setVolume(currentValue);
    // setBackgroundSize((value / volumeStep) * 5 + `% 100%`);
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

        <InputRange
          classes="progress"
          min="0"
          max={String(Math.round(audio.duration))}
          step="1"
          inputValue={progress}
          callback={handlerChangeProgress}
        />

        <div className="player__time-volume-box time-volume-box">
          <span className="time-volume-box__time time">
            {getFormatTime(currentTime)}
          </span>

          <InputRange
            classes="time-volume-box__volume volume"
            min="0"
            max="1"
            step="0.05"
            inputValue={volume}
            callback={handlerChangeVolume}
          />
        </div>
      </div>
      <Link className="player__btn-back btn-back" to="/">
        Back
      </Link>
    </div>
  );
};
