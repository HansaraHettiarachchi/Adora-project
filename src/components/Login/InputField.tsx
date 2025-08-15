import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, name, value, onChange }) => (
  <div className="mb-3">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-control form-control-lg rounded-pill"
      required
    />
  </div>
);

export default InputField;
