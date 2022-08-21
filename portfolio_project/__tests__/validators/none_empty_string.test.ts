/** @format */

import { vOptionalString, vEmptyString } from "@lib/validators";

describe("None emptys string tests", () => {
  it("Should pass and not trim if the assigned value is a string with at least 1 character", () => {
    expect(vEmptyString.safeParse("Hello World!").success).toBeTruthy;
  });

  it("Should throw an error if the assigned value is empty", () => {
    expect(vEmptyString.safeParse("").success).toBeFalsy();
  });
  it("Should throw an error if the assigned value is a whitespace", () => {
    expect(
      vEmptyString.safeParse("                                    ").success
    ).toBeFalsy();
  });

  it("Should pass if the assigned value is null and the optional function is given", () => {
    expect(vOptionalString.safeParse(null).success).toBeTruthy();
  });
});
