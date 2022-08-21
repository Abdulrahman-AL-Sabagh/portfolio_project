/** @format */

/** @format */

import { vPassword } from "@lib/validators";
describe("Password Validator", () => {
  it("Should throw an Error if password is empty", () => {
    expect(vPassword.safeParse("").success).toBeFalsy();
  });

  it("Should throw an Error if password does not contains 8 or more characters", () => {
    expect(vPassword.safeParse("1234567").success).toBeFalsy();
  });

  it("Should throw an Error if password does not contains only white spaces", () => {
    expect(
      vPassword.safeParse(
        "                                                                       \n"
      ).success
    ).toBeFalsy();
  });
  it("Should pass if a password with 8 characters is given", () => {
    const x = "12345678";
    expect(vPassword.parse(x)).toBe(x);
  });
});
