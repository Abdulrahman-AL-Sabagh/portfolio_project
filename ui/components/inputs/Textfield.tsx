import { Dispatch, SetStateAction } from "react";
import styles from "./Textfield.module.scss";
export interface TextFieldProps {
  label?: string;
  type: string;
  validators?: Function[];
  errorMessages?: string[];
  className?: string;
  placeholder?: string;
  labelStyle?: string;
  value: string;
  onChange: (value: any) => void;
}
const TextField = ({
  type,
  className,
  placeholder,
  label,
  validators,
  labelStyle,
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <div className={styles.Textfield}>
      <label> {label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className={`${className}
        border-2
      border-slate-300
        outline-none
        p-2
        rounded-lg
      focus:border-blue-400
        transition-all`}
      />
    </div>
  );
};
export default TextField;
