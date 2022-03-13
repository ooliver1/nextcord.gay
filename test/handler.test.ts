import { handleRequest } from "../src/handler";
import makeServiceWorkerEnv from "service-worker-mock";

declare var global: any;

describe("handle", () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv());
    jest.resetModules();
  });

  test("handle bot", async () => {
    const result = await handleRequest(
      new Request("/", {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; DiscordBot/2.0; +https://discordapp.com)",
        },
      })
    );
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toContain("Nextcord");
  });

  test("handle user", async () => {
    const result = await handleRequest(
      new Request("/", {
        method: "GET",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 OPR/83.0.4254.70",
        },
      })
    );
    expect(result.status).toEqual(301);
    expect(result.headers.get("location")).toEqual(
      "https://youtube.com/watch?v=dQw4w9WgXcQ"
    );
  });

  test("handle no user-agent", async () => {
    const result = await handleRequest(
      new Request("/", {
        method: "GET",
      })
    );
    expect(result.status).toEqual(200);
    const text = await result.text();
    expect(text).toEqual("No user-agent, impressive!");
  });
});
