/** @format */

import { vDeadline } from "@lib/validators";
/** @format */

describe("Deadline validator", () => {
  it("Should fail if the deadline is not in or after 10 minutes from now", () => {
    const date = new Date().setMinutes(new Date().getMinutes() + 9);
    expect(vDeadline.safeParse(new Date(date)).success).toBeFalsy();
  });
  it("Should not fail if the given value is null", () => {
    expect(vDeadline.safeParse(null).success).toBeTruthy();
  });

  it("Should pass if the deadline is in or after 10 minutes from now", () => {
    const addTenMinutes = new Date().setMinutes(new Date().getMinutes() + 10);
    expect(vDeadline.safeParse(new Date(addTenMinutes)).success).toBeTruthy;
  });
});
