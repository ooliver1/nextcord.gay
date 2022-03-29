import domains from "../src/domains";

test("check domains", () => {
  for (const [domain, text] of Object.entries(domains)) {
    expect(typeof domain === "string").toBe(true);
    expect(typeof text === "string").toBe(true);
  }
});
