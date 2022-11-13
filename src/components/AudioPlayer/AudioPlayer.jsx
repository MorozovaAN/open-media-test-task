import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatTime } from '../../helpers/formatTime';
import { InputRange } from '../common/InputRange/InputRange';
import './AudioPlayer.css';

export const AudioPlayer = ({ audio }) => {
  const audioSrc = audio.src;
  const canStartPlay = audio.readyState >= 3;
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.2);
  const [audioStream, setAudioStream] = useState(false);
  const [progressMaxValue, setProgressMaxValue] = useState(0);

  useEffect(() => {
    const canPlayAudio = () => {
      const audioDurationSec = Math.floor(audio.duration);

      isFinite(audioDurationSec)
        ? setProgressMaxValue(audioDurationSec)
        : setAudioStream(true);

      setLoaded(true);
    };

    const stopAudio = () => {
      setPlaying(false);
      audio.pause();
      audio.currentTime = 0;
    };

    const updateTimeAudio = () => {
      setLoaded(true);
      setCurrentTime(Math.floor(audio.currentTime));
    };

    if (!audioSrc) setLoaded(true);
    if (canStartPlay) {
      canPlayAudio();
    }

    audio.addEventListener('loadeddata', canPlayAudio);
    audio.addEventListener('timeupdate', updateTimeAudio);
    audio.addEventListener('ended', stopAudio);

    return () => {
      audio.removeEventListener('loadeddata', canPlayAudio);
      audio.removeEventListener('timeupdate', updateTimeAudio);
      audio.removeEventListener('ended', stopAudio);
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (audioStream && currentTime > progressMaxValue) {
      setProgressMaxValue(currentTime);
    }
  }, [currentTime]);

  const handlerPlayPause = () => {
    setPlaying(() => {
      playing ? audio.pause() : audio.play();
      return !playing;
    });
  };

  const handlerChangeProgress = (currentValue) => {
    setLoaded(false);
    setCurrentTime(() => {
      audio.currentTime = currentValue;
      return currentValue;
    });
  };

  const handlerChangeVolume = (currentValue) => {
    setVolume(() => {
      audio.volume = currentValue;
      return currentValue;
    });
  };

  const btnClasses = playing
    ? 'player-box__player-btn player-btn player-btn--pause'
    : 'player-box__player-btn player-btn player-btn--play';

  const playerBoxClasses = loaded
    ? 'player__player-box player-box'
    : 'player__player-box player-box loader';

  return (
    <div className="player">
      {audioSrc ? (
        <a href={audioSrc} className="player__src src">
          {audioSrc}
        </a>
      ) : (
        <p className="player__src src">no audio source</p>
      )}

      <div className={playerBoxClasses}>
        <button
          className={btnClasses}
          onClick={handlerPlayPause}
          disabled={!audioSrc || (audioSrc && !loaded)}
        ></button>

        <InputRange
          classes="player-box__progress progress"
          min="0"
          max={progressMaxValue}
          step="1"
          inputValue={currentTime}
          callback={handlerChangeProgress}
        />

        <div className="player-box__time-volume-box time-volume-box">
          <span className="time-volume-box__time time">
            {formatTime(currentTime)}
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
