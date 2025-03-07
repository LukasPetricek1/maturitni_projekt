import React, { ChangeEvent, useEffect, useState } from "react";
import UserInput from "../components/UserInput";

interface Props {
  setValid: (name: string, state: boolean) => void;
  value: string;
  setValue: (e: string) => void;
  id: string;
  label: string;
  maxLength: number;
  name: "password" | "username" | "name" | "web" | "bio" | "email";
  placeholder: string;
  type: string;
  version: "light" | "dark";
}

const InputCheck: React.FC<Props> = ({
  setValid,
  value,
  setValue,
  id,
  label,
  maxLength,
  name,
  placeholder,
  type,
  version,
}) => {
  const [ERROR, setError] = useState<string>("");

  useEffect(() => {
    if (ERROR) {
      setValid(name, false);
    } else {
      setValid(name, true);
    }
  }, [ERROR]);

  useEffect(() => {
    switch (name) {
      case "name":
        if (!(value.trim().length > 5)) {
          setError("Musí mít alespoň 5 znaků.");
        } else if (!/^[a-zA-Zá-žÁ-Ž\s]+$/.test(value)) {
          setError("Pouze písmena a mezery.");
        } else if (value.length > 45) {
          setError("Nesmí být delší než 45 znaků.");
        } else {
          setError("");
        }
        break;

      case "username":
        if (!value.trim()) {
          setError("Uživatelské Jméno nesmí být prázdné.");
        } else if (!/^[a-z0-9_.]+$/.test(value)) {
          setError(
            "Uživatelské Jméno musí obsahovat pouze písmena, čísla, _ a ."
          );
        } else if (value.length < 3 || value.length > 45) {
          setError(
            "Uživatelské jméno musí být delší než 3 a kratší než 45 znaků."
          );
        } else if (/^\./.test(value) || /\.$/.test(value)) {
          setError("Uživatelské jméno nesmí začínat nebo končit tečkou.");
        } else if (/_{2,}|\.\./.test(value)) {
          setError(
            "V uživatelském jméně se nesmí objevit více teček za sebou."
          );
        } else {
          setError("");
        }
        break;

      case "web":
        if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)) {
          setError(
            "Osobní stránka musí být platnou URL adresou začínající http:// nebo https://"
          );
        } else if (value.length > 100) {
          setError("Osobní stránka nesmí být delší než 100 znaků.");
        } else {
          setError("");
        }
        break;

      case "bio":
        if (value.length > 250) {
          setError("BIO musí být kratší než 250 znaků.");
        } else {
          setError("");
        }
        break;

      case "email":
        if (!value.trim()) {
          setError("E-mail je povinný.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setError("Neplatný formát e-mailu.");
        } else if (value.length > 100) {
          setError("E-mail nesmí být delší než 100 znaků.");
        } else {
          setError("");
        }
        break;
    }
  }, [name, value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== " ") {
      setValue(e.target.value);
    }
  }

  return (
    <UserInput
      id={id}
      label={label}
      maxLength={maxLength}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
      type={type}
      version={version}
    >
      <>
        {ERROR && (
          <div className="mt-4 mb-4">
            <ul className="text-red-700 list-inside">
              <li>{ERROR}</li>
            </ul>
          </div>
        )}
      </>
    </UserInput>
  );
};

export default InputCheck;
