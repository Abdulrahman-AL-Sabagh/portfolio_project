/** @format */

export interface IForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface MyInput {
  name: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    pattern?:  ValidationRule<RegExp>
  };
}
