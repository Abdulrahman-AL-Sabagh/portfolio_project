/** @format */

import { ZodError } from "zod";
/** @format */

import { vBirthday } from "@lib/validators";
/** @format */

describe("Birthday Validator", () => {
  it("Should not pass if the years of the given value are not greater or equal to seven", () => {
    try {
      vBirthday.parse(new Date());
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should pass if the given value is null", () => {
    expect(vBirthday.parse(null)).toBeNull();
  });

  it("Should pass if the years of the given value are greater or equal to seven", () => {
    const subtractSevenYears = new Date().setFullYear(
      new Date().getFullYear() - 7
    );
    const date = new Date(subtractSevenYears);

    expect(vBirthday.parse(date)).toBeInstanceOf(Date)
  });
});
     