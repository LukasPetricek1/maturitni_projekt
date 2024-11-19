import React from "react";

interface UserInputProps  { 
  type? : string;
  label : string;
  name : string;
  id: string;
  placeholder : string;
  value : string;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInput: React.FC<UserInputProps> = ({ type = "text", label , name , id, value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-300 text-sm mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        {...props}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  );
};

export default UserInput;
