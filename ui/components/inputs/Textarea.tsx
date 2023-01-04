import { Dispatch, SetStateAction } from "react";
interface Props {
  onChange: Dispatch<SetStateAction<any>>;
  value: string;
}

const Textarea = ({ onChange, value }: Props) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  );
};
export default Textarea;
