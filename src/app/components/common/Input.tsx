import React from "react";
import "@Styles/common/input.css";
import { IInputProps } from "@Types/components/common/input";
import emailImg from "@Images/reglog/mail.png";
import passImg from "@Images/reglog/password.png";

export const Input = ({
  type,
  inputRef,
  placeholder,
  label,
  maxLength,
  minLength,
  onChange,
  style,
  validate,
}: IInputProps) => {
  // Valide input state, if requested so
  const [isValid, setIsValid] = React.useState(null);

  const getValidateValueStyle = (value: string) => {
    // Check if value entered, if so - check if its valid.
    // If no value entered - let it be white (regular) color.
    return { borderColor: value ? (isValid ? "green" : "red") : "white" };
  };

  const handleChange = (value: string) => {
    // If we have a validate value as true, we have to pass into onChange prop validate function, that returns true or false by input value.
    validate ? setIsValid(onChange(value, type)) : onChange(value);
  };
  const getStyle = () => {
    const inputValue = inputRef?.current?.value;
    return validate
      ? { ...style, ...getValidateValueStyle(inputValue) }
      : style;
  };

  const inputId = Math.random().toString();
  const getLabel = (type: "email" | "password") => {
    switch (type) {
      case "email":
        return (
          <label className="reglog_label" htmlFor={inputId}>
            <img className="reglog_label_email_img" src={emailImg} />
            <span>{label || "Email"}</span>
          </label>
        );
      case "password":
        return (
          <label className="reglog_label" htmlFor={inputId}>
            <img className="reglog_label_pass_img" src={passImg} />
            <span>{label || "Password"}</span>
          </label>
        );
    }
  };

  return (
    <div className="reglog_input_container">
      {getLabel(type)}
      <input
        style={getStyle()}
        onChange={(e) => onChange && handleChange(e.target.value)}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        type={type}
        ref={inputRef}
        className="reglog_input"
        id={inputId}
      />
    </div>
  );
};
