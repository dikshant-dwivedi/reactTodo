import React from "react";
import "./styles.css";

export const InputField = ({
  type,
  value,
  error,
  placeholder,
  label,
  onChange,
  isDisabled,
}) => {
  switch (type) {
    case "email":
    case "password":
    case "text": {
      return (
        <div className="form-group my-4">
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="form-control my-input-field"
          />
          {error && (
            <p className="my-error">
              <img
                src={"/assets/svgs/jamAlert.svg"}
                alt="error-alert"
                className="me-1"
              />
              <small>{error}</small>
            </p>
          )}
        </div>
      );
    }
    case "Submit":
      return (
        <div className="form-group my-4">
          <input
            type="Submit"
            value={value}
            className={`my-submit-button my-submit-button-${
              isDisabled ? "disabled" : "active"
            }`}
            disabled={isDisabled}
          />
          {error && (
            <p className="my-error">
              <img
                src={"/assets/svgs/jamAlert.svg"}
                alt="error-alert"
                className="me-1"
              />
              <small>{error}</small>
            </p>
          )}
        </div>
      );
    case "checkbox":
      return (
        <div className="form-group my-4">
          <input
            type="checkbox"
            className="remember-me-checkbox me-1"
            checked={value}
            onChange={onChange}
            id="remember-check"
          />
          <label className="remember-me-label" htmlFor="remember-check">
            {label}
          </label>
        </div>
      );
    default:
      return (
        <div className="form-group my-4">
          <input type="text" className="form-control" placeholder="text" />
        </div>
      );
  }
};
