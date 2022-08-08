/** @format */

import { ZodError } from "zod";
/** @format */

import { vName, vOptionalName } from "@lib/validators";

describe("Name validator", () => {
  it("Should throw an error if an empty value is given", () => {
    try {
      vName.parse("");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should throw an error if the assigned value contains less than 3 characters", () => {
    try {
      vName.parse("12");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should throw an error if the assigned value contains only whitespaces", () => {
    try {
      vName.parse(`\n \n \n`);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should pass if null is given and the optional name function is used", () => {
    expect(vOptionalName.parse(null)).toBeNull();
  });
});
