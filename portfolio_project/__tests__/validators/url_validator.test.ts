/** @format */

import { ZodError } from "zod";
import { vUrl } from "@lib/validators";
describe("URL validator", () => {
  it("Should pass if the given value is a url", () => {
    const url = vUrl.parse("https://www.google.at/");
    expect(url).toBe("https://www.google.at/");
  });
  
  it("Should not pass if the given value is not a url", () => {
    try {
      vUrl.parse("name");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should not pass if the given value is empty", () => {
    try {
      vUrl.parse("");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("Should not pass if the given value is a whitespace", () => {
    try {
      vUrl.parse("                                                         ");
    } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
    }
  });
});
