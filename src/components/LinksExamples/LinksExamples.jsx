import { useState } from 'react';
import { ReactComponent as Arrow } from '../../assets/images/arrow-select.svg';
import './LinksExamples.css';

export const LinksExamples = ({ setInputValue, disabled }) => {
  const [showSelectOptions, setShowSelectOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(
    'Select a link from the examples'
  );

  const options = [
    'https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals',
    'https://chillout.zone/chillin',
    'https://c5.radioboss.fm:18084/stream',
  ];

  const handlerSelectOption = (option) => {
    setCurrentOption(option);
    setShowSelectOptions(false);
    setInputValue(option);
  };

  const selectLisrOptionClasses = `'select__List select-List' + ${
    showSelectOptions ? 'select-List--active' : 'select-List--hidden'
  }`;

  const arrowClasses = showSelectOptions
    ? 'current-value__arrow--down'
    : 'current-value__arrow--up';

  return (
    <div className={disabled ? 'select select--disabled' : 'select'}>
      <div
        onClick={() => setShowSelectOptions(!showSelectOptions)}
        className="select__current-value current-value"
      >
        <p className="current-value__text">{currentOption}</p>
        <Arrow height="8" className={arrowClasses} />
      </div>

      <ul className={selectLisrOptionClasses}>
        {options.map((option, index) => (
          <li
            onClick={() => handlerSelectOption(option)}
            key={index}
            className="select__option"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
