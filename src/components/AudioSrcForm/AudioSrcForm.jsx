import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidUrl } from '../../helpers/isValidUrl';
import './AudioSrcForm.css';

export const AudioSrcForm = ({ audio }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    setValidation(true);

    if (isValidUrl(inputValue)) {
      audio.src = inputValue;

      function urlNoValid() {
        audio.removeEventListener('canplay', urlValid);
        audio.removeEventListener('error', urlNoValid);
        setError(true);
        setValidation(false);
      }

      function urlValid() {
        audio.removeEventListener('canplay', urlValid);
        audio.removeEventListener('error', urlNoValid);
        navigate('/player');
        setValidation(false);
      }

      audio.addEventListener('error', urlNoValid);
      audio.addEventListener('canplay', urlValid);
    } else {
      setError(true);
      setValidation(false);
    }
  };

  const handlerChangeInputValue = (e) => {
    setError(false);
    setInputValue(e.currentTarget.value);
  };

  const inputClasses = error
    ? 'input-btn-box__input input input--error'
    : 'input-btn-box__input input';

  return (
    <form className="form" onSubmit={handlerSubmit}>
      <label>
        <p className="form__label-text label-text">Insert the link</p>

        <div className="form__input-btn-box input-btn-box">
          <input
            className={inputClasses}
            placeholder="https://"
            disabled={validation}
            value={inputValue}
            onChange={handlerChangeInputValue}
            onFocus={() => setError(false)}
          />
          <button
            className="input-btn-box__btn-submit btn-submit"
            type="submit"
            disabled={validation}
          />
        </div>

        <p className="form__error error">{error && 'Error message here'}</p>
      </label>
    </form>
  );
};
