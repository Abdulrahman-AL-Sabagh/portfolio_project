/** @format */

import { ZodError } from "zod";
import { vDeadline } from "@lib/validators";
/** @format */

describe("Deadline validator", () => {
  it("Should fail if the deadline is not in or after 10 minutes from now", () => {
    try {
      const date = new Date().setMinutes(new Date().getMinutes() + 9);
      vDeadline.parse(new Date(date));
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  it("Should not fail if the given value is null", () => {
    expect(vDeadline.parse(null)).toBeNull();
  });

  it("Should pass if the deadline is in or after 10 minutes from now", () => {
    const addTenMinutes = new Date().setMinutes(new Date().getMinutes() + 10);
    const date = vDeadline.parse(new Date(addTenMinutes));
    expect(date).toBeInstanceOf(Date);
  });
});
