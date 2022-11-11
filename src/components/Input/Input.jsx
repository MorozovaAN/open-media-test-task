import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidUrl } from '../../helpers/isValidUrl';
import './Input.css';

export const Input = ({ setAudioURL }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(inputValue)) {
      setError(true);
    } else {
      setAudioURL(inputValue);
      navigate('/player');
    }
  };

  const handlerChangeInputValue = (e) => {
    setError(false);
    setInputValue(e.currentTarget.value);
  };

  const inputClasses = error ? 'input input--error' : 'input';

  return (
    <form className="form" onSubmit={handlerSubmit}>
      <label>
        <p className="form__label-text label-text">Insert the link</p>

        <div className="form__input-btn-box input-btn-box">
          <input
            className={inputClasses}
            placeholder="https://"
            value={inputValue}
            onChange={handlerChangeInputValue}
            onFocus={() => setError(false)}
          />
          <button className="input-btn-box__btn-submit btn-submit" type="submit" />
        </div>

        <p className="form__error error">{error && 'Error message here'}</p>
      </label>
    </form>
  );
};
