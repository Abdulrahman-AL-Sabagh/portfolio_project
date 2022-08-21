/** @format */

import { vEmail } from "@lib/validators";

describe("Email validator", () => {
  it("Should throw an Error if email is empty", () => {
    expect(vEmail.safeParse("").success).toBeFalsy();
  });
  it("Should throw an Error if email is not a real email", () => {
    expect(vEmail.safeParse("a..c.c.c.c.c").success).toBeFalsy();
  });
  it("Should throw an Error if email ...", () => {
    expect(
      vEmail.safeParse("                                         \n \n").success
    ).toBeFalsy();
  });

  it("Should pass if a real email is provided", () => {
    const email = "abcdefg8@gmail.com";
    expect(vEmail.parse(email)).toBe(email);
  });
});
