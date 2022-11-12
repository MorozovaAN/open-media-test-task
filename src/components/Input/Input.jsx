import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidUrl } from '../../helpers/isValidUrl';
import './Input.css';

export const Input = ({ setAudioURL }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (validation) {
      if (isValidUrl(inputValue)) {
        const audio = new Audio(inputValue);

        function urlNoValid() {
          audio.removeEventListener('error', urlNoValid);
          setError(true);
          setValidation(false);
        }

        function urlValid() {
          audio.removeEventListener('canplay', urlValid);
          setAudioURL(inputValue);
          navigate('/player');
        }

        audio.addEventListener('error', urlNoValid);
        audio.addEventListener('canplay', urlValid);
      } else {
        setError(true);
        setValidation(false);
      }
    }
  }, [validation]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    setValidation(true);
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
