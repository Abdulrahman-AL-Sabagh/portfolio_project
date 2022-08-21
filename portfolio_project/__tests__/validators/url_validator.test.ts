/** @format */
import { vUrl } from "@lib/validators";
describe("URL validator", () => {
  it("Should pass if the given value is a url", () => {
    const url = vUrl.parse("https://www.google.at/");
    expect(url).toBe("https://www.google.at/");
  });

  it("Should not pass if the given value is not a url", () => {
    expect(vUrl.safeParse("name").success).toBeFalsy();
  });

  it("Should not pass if the given value is empty", () => {
    expect(vUrl.safeParse("").success).toBeFalsy();
  });

  it("Should not pass if the given value is a whitespace", () => {
    expect(
      vUrl.safeParse(
        "                                                         "
      ).success
    ).toBeFalsy();
  });
});
