import React , { forwardRef , useRef, useState } from "react";

import { FaEye as Show , FaEyeSlash as Hide } from "react-icons/fa";


interface UserInputProps  { 
  type? : string;
  label : string;
  name : string;
  id: string;
  placeholder : string;
  value : string;
  maxLength: number;
  onChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  children? : JSX.Element;
}

const UserInput = forwardRef<HTMLInputElement , UserInputProps>(({ type = "text", label , name , id, value,children, onChange, ...props }) => {
  const input = useRef<HTMLInputElement>(null)!
  const [visible, setVisible] = useState(false)

  const switchPasswordVisibility = () => { 
    input.current!.type = !visible ? "text" : "password"
    setVisible(!visible)
  }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-300 text-sm mb-2">
        {label}
      </label>
      <div className="relative">
      <input
          ref={input}
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          {...props}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
      />
      {type === "password" && <button onClick={switchPasswordVisibility} type="button" className="absolute top-[50%] translate-y-[-50%] right-4 hover:translate-y-[-50%] hover:scale-125 text-purple-700">
        {visible ? <Show /> : <Hide /> }
      </button>}
      </div>
      {children && children}
    </div>
  );
});

export default UserInput;
