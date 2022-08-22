/** @format */
import z from "zod";
export const vEmptyString = z
  .string({
    invalid_type_error: "Whitespace alone are not allowed",
    required_error: "This field is required",
  })
  .trim()
  .min(1);

export const vOptionalString = vEmptyString.nullable();

export const vDeadline = z
  .date()
  .min(new Date(new Date().setMinutes(new Date().getMinutes() + 10)))
  .nullable();

export const vBirthday = z
  .date()
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  .nullable().optional();
export const vName = z
  .string({
    invalid_type_error: "Invalid name",
    required_error: "Name is required",
    description: "At least 3 characters",
  })
  .trim()
  .min(3);
export const vOptionalName = vName.nullable().optional();
export const vUrl = z
  .string({
    invalid_type_error: "This is not a url",
  })
  .url()
  .trim()
  .nullable().optional();
//TODO Add error messages
export const vPassword = z
  .string({
    invalid_type_error: "Invalid password",
    required_error: "Password is required",
    description: "8 charcters at leaset",
  })
  .trim()
  .min(8)
  .max(256);
export const vEmail = z
  .string({
    invalid_type_error: "Invalid email",
    required_error: "Email is required",
  })
  .trim()
  .email();
export const vId = z.string().uuid({ message: "Invalid Id" });

//TODO TEST PASSWORD AND EMAIL
