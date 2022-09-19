/** @format */

import Button, { ButtonType } from "..";

const BlockButton: ButtonType = ({ children, className, ...rest }) => {
  return (
    <Button {...rest} className={`block w-full ${className}`}>
      {children}
    </Button>
  );
};

export default BlockButton;
