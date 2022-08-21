/** @format */

import { vName, vOptionalName } from "@lib/validators";

describe("Name validator", () => {
  it("Should throw an error if an empty value is given", () => {
    expect(vName.safeParse("").success).toBeFalsy();
  });
  it("Should throw an error if the assigned value contains less than 3 characters", () => {
    expect(vName.safeParse("12").success).toBeFalsy();
  });
  it("Should throw an error if the assigned value contains only whitespaces", () => {
    expect(vName.safeParse(`\n \n \n`).success).toBeFalsy();
  });
  it("Should pass if null is given and the optional name function is used", () => {
    expect(vOptionalName.parse(null)).toBeNull();
  });
});
