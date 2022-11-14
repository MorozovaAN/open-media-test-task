import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidUrl } from '../../helpers/isValidUrl';
import './AudioSrcForm.css';

export const AudioSrcForm = ({ audio }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    setValidation(true);

    if (isValidUrl(inputValue)) {
      audio.src = inputValue;

      const validationHelper = () => {
        audio.removeEventListener('loadedmetadata', openPlayer);
        setValidation(false);
      };

      const openPlayer = () => {
        validationHelper();
        navigate('/player');
      };

      audio.addEventListener('loadedmetadata', openPlayer);

      audio.addEventListener('error', () => {
        validationHelper();
        setError('url has no audio source');
      });
    } else {
      setError('incorrect url');
      setValidation(false);
    }
  };

  const handlerChangeInputValue = (e) => {
    setError('');
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
            onFocus={() => setError('')}
          />
          <button
            className="input-btn-box__btn-submit btn-submit"
            type="submit"
            disabled={validation}
          />
        </div>

        <p className="form__error error">{error}</p>
      </label>
    </form>
  );
};
