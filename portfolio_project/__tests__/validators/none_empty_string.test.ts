/** @format */

import { vOptionalString, vEmptyString } from "./../../lib/validators";
import { ZodError } from "zod";

describe("None emptys string tests", () => {
  it("Should pass and not trim if the assigned value is a string with at least 1 character", () => {
    const x = vEmptyString.parse("Hello World!");

    expect(x).toEqual("Hello World!");
  });

  it("Should throw an error if the assigned value is empty", () => {
    try {
      vEmptyString.parse("");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should throw an error if the assigned value is a whitespace", () => {
    try {
      vEmptyString.parse("                                    ");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should pass if the assigned value is undefined and the optional function is given", () => {
    expect(vOptionalString.parse(undefined)).toBeUndefined();
  });
});



