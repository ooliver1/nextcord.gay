import { handleRequest } from "../src/index";
import domains from "../src/domains";

const userUserAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 " +
  "Safari/537.36 OPR/83.0.4254.70";
const botUserAgent =
  "Mozilla/5.0 (compatible; DiscordBot/2.0; " + "+https://discordapp.com)";

describe("handle", () => {
  test("handle bot", async () => {
    const env = getMiniflareBindings();
    const result = await handleRequest(
      new Request("http://localhost", { headers: { "user-agent": botUserAgent } }),
      env
    );
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toContain("Nextcord");
  });

  test("handle user", async () => {
    const env = getMiniflareBindings();
    const result = await handleRequest(
      new Request("http://localhost", {
        headers: { "user-agent": userUserAgent, test: "yes" },
      }),
      env
    );
    expect(result.status).toEqual(301);
    expect(Object.keys(domains)).toContain(result.headers.get("location"));
  });

  test("handle no user-agent", async () => {
    const env = getMiniflareBindings();
    const result = await handleRequest(new Request("http://localhost"), env);
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("No user-agent, impressive!");
  });
});
