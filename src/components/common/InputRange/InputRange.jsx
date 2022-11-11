import { useEffect, useState } from 'react';

export const InputRange = ({
  classes,
  min,
  max,
  step,
  inputValue,
  callback,
}) => {
  const percentStep = 100 / (max / step);
  const [progressBarBgSize, setProgressBarBgSize] = useState('0% 100%');

  useEffect(() => {
    setProgressBarBgSize((inputValue / step) * percentStep + `% 100%`);
  }, [inputValue, max]);

  const handlerChangeInput = (e) => {
    callback(e.currentTarget.value);
  };

  return (
    <input
      className={classes}
      type="range"
      min={min}
      max={max}
      step={step}
      value={inputValue}
      onInput={handlerChangeInput}
      style={{ backgroundSize: `${progressBarBgSize}` }}
    />
  );
};
