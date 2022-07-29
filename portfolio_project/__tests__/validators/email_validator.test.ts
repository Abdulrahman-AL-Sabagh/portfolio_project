/** @format */

import { ZodError } from "zod";
import { vEmail } from "../../lib/validators";

describe("Email validator", () => {
  it("Should throw an Error if email is empty", () => {
    try {
      vEmail.parse("");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should throw an Error if email is not a real email", () => {
    try {
      vEmail.parse("a..c.c.c.c.c");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should throw an Error if email ...", () => {
    try {
      vEmail.parse("                                         \n \n");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should pass if a real email is provided", () => {
    const email = "abdsabagh8@gmail.com";
    expect(vEmail.parse(email)).toBe(email);
  });
});
