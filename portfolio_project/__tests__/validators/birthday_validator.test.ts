/** @format */

import { vBirthday } from "@lib/validators";

describe("Birthday Validator", () => {
  it("Should not pass if the years of the given value are not greater or equal to seven", () => {
    expect(vBirthday.safeParse(new Date()).success).toBeFalsy();
  });

  it("Should pass if the given value is null", () => {
    expect(vBirthday.safeParse(null).success).toBeTruthy();
  });

  it("Should pass if the years of the given value are greater or equal to seven", () => {
    const subtractSevenYears = new Date().setFullYear(
      new Date().getFullYear() - 7
    );
    const date = new Date(subtractSevenYears);

    expect(vBirthday.safeParse(date).success).toBeTruthy();
  });
});
