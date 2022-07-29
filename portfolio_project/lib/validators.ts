/** @format */
import z from "zod";
export const vEmptyString = z
  .string({
    invalid_type_error: "Whitespace alone are not allowed",
    required_error: "This field is required",
  })
  .trim()
  .min(1);

export const vOptionalString = vEmptyString.optional();

export const vDeadline = z
  .date()
  .min(new Date(new Date().setMinutes(new Date().getMinutes() + 10)))
  .optional();

export const vBirthday = z
  .date()
  .max(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  .optional();
export const vName = z.string().trim().min(3);
export const vOptionalName = vName.optional();
export const vUrl = z
  .string({
    invalid_type_error: "This is not a url",
  })
  .url()
  .trim();
//TODO Add error messages
export const vPassword = z.string().trim().min(8);
export const vEmail = z.string().trim().email();

//TODO TEST PASSWORD AND EMAIL
