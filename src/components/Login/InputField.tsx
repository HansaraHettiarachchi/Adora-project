import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, name }) => (
  <div className="mb-3">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="form-control form-control-lg rounded-pill"
      required
    />
  </div>
);

export default InputField;
