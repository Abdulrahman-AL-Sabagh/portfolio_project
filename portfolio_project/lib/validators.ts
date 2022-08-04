/** @format */
import z from "zod";
export const vEmptyString = z
  .string({
    invalid_type_error: "Whitespace alone are not allowed",
    required_error: "This field is required",
  })
  .trim()
  .min(1)

export const vOptionalString = vEmptyString.nullable();

export const vDeadline = z
  .date()
  .min(new Date(new Date().setMinutes(new Date().getMinutes() + 10)))
  .nullable();

export const vBirthday = z
  .date()
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  .nullable();
export const vName = z.string().trim().min(3);
export const vOptionalName = vName.nullable();
export const vUrl = z
  .string({
    invalid_type_error: "This is not a url",
  })
  .url()
  .trim()
  .nullable();
//TODO Add error messages
export const vPassword = z.string().trim().min(8).max(256);
export const vEmail = z.string().trim().email();
export const vId = z.string().uuid({ message: "Invalid Id" });

//TODO TEST PASSWORD AND EMAIL
