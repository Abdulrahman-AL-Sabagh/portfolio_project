/** @format */

import { ZodError } from "zod";
/** @format */

import { vPassword } from "@lib/validators";
describe("Password Validator", () => {
  it("Should throw an Error if password is empty", () => {
    try {
      vPassword.parse("");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should throw an Error if password does not contains 8 or more characters", () => {
    try {
      vPassword.parse("1234567");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should throw an Error if password does not contains only white spaces", () => {
    try {
      vPassword.parse(
        "                                                                       \n"
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should pass if a password with 8 characters is given", () => {
    const x = "12345678";
    expect(vPassword.parse(x)).toBe(x);
  });
});
