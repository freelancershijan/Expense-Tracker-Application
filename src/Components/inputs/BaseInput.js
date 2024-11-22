import PropTypes from 'prop-types';

export default function BaseInput({
  required,
  label,
  value,
  setValue,
  showError,
  errorMessage,
  placeholder,
  type,
}) {
  return (
    <div>
      <label
        htmlFor="hs-validation-name-error"
        className="block text-gray-700 font-bold mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={`input-${ label.toLowerCase().replace(/\s+/g, '-') }`}
          name={`input-${ label.toLowerCase().replace(/\s+/g, '-') }`}
          {...(type === 'number' && { min: 0 })}
          className={`py-3 px-4 block w-full border-2 ${ showError ? 'border-red-500' : 'border-gray-300'
            } rounded-lg text-sm`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={showError}
          aria-describedby={showError ? `error-${ label.toLowerCase().replace(/\s+/g, '-') }` : undefined}
        />
        {showError && (
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
            <svg
              className="shrink-0 size-4 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
        )}
      </div>
      {showError && (
        <p className="text-sm text-red-600 mt-2">{errorMessage}</p>
      )}
    </div>
  );
}

// PropTypes Validation
BaseInput.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'password']),
};

// Default Props
BaseInput.defaultProps = {
  required: false,
  value: '',
  showError: false,
  errorMessage: '',
  placeholder: '',
  type: 'text',
};
