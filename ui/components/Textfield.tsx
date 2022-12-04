export interface TextFieldProps {
  text?: string;
  type: string;
  errors?: Function[];
  errorMessages?: string[];
  className: string;
  placeholder?: string;
  labelStyle: string;
}
const TextField = ({ type, className, placeholder }: TextFieldProps) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`${className} border-2 border-slate-300 outline-none p-2 rounded-lg focus:border-blue-400`}
    />
  );
};
export default TextField;
