import { useState } from 'react';

export const InputRange = ({
  classes,
  min,
  max,
  step,
  inputValue,
  callback,
}) => {
  const percentStep = 100 / (max / step);
  const [progressBarBgSize, setProgressBarBgSize] = useState(
    `${(inputValue / step) * percentStep}% 100%`
  );

  const handlerChangeInput = (e) => {
    const currentValue = e.currentTarget.value;
    callback(currentValue);
    setProgressBarBgSize((currentValue / step) * percentStep + `% 100%`);
  };

  return (
    <input
      className={classes}
      type="range"
      min={min}
      max={max ? max : 0} 
      step={step}
      value={inputValue}
      onInput={handlerChangeInput}
      style={{ backgroundSize: `${progressBarBgSize}` }}
    />
  );
};
