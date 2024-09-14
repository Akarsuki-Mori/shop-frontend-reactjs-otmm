import React from "react";

const InputField = React.memo(
  ({ label, type, value, onChange, name, placeholder }) => {
    return (
      <div className="custome-input">
        <label htmlFor={name}>{label}:</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default InputField;
