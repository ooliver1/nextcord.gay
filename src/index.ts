import isbot from "isbot";
import domains from "./domains";

const html = `
<!-- Primary Meta Tags -->
<title>Nextcord - A Feature Rich Discord API Wrapper In Python</title>
<meta name="title" content="Nextcord - A Feature Rich Discord API Wrapper In Python">
<meta name="description" content="A modern, easy-to-use, feature-rich, and async-ready API wrapper for Discord written in Python.

Modern Pythonic API using async and await.
Proper rate limit handling.
Optimised in both speed and memory.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://nextcord.gay">
<meta property="og:title" content="Nextcord - A Feature Rich Discord API Wrapper In Python">
<meta property="og:description" content="A modern, easy-to-use, feature-rich, and async-ready API wrapper for Discord written in Python.

Modern Pythonic API using async and await.
Proper rate limit handling.
Optimised in both speed and memory.">
<meta property="og:image"
    content="https://raw.githubusercontent.com/nextcord/nextcord/master/assets/logo.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary">
<meta property="twitter:url" content="https://nextcord.gay">
<meta property="twitter:title" content="Nextcord - A Feature Rich Discord API Wrapper In Python">
<meta property="twitter:description" content="A modern, easy-to-use, feature-rich, and async-ready API wrapper for Discord written in Python.

Modern Pythonic API using async and await.
Proper rate limit handling.
Optimised in both speed and memory.">
<meta property="twitter:image"
    content="https://raw.githubusercontent.com/nextcord/nextcord/master/assets/logo.png">

<body>h</body>
`;

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const userAgent = request.headers.get("user-agent");
  const test = request.headers.get("test");

  const testParam = test ? "&wait=true" : "";

  if (userAgent) {
    if (isbot(userAgent)) {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    const domainMap = Object.entries(domains);
    const [domain, text] = domainMap[Math.floor(Math.random() * domainMap.length)];

    const discordReq = await fetch(
      `${env.WEBHOOK}?thread_id=${env.THREAD_ID}${testParam}`,
      {
        method: "POST",
        body: JSON.stringify({
          content: `[${text}](<https://nextcord.gay>)`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (discordReq.status === 200) {
      // 200 if wait is enabled - message object received
      const json: hasId = await discordReq.json();
      await fetch(`${env.WEBHOOK}/messages/${json.id}?thread_id=${env.THREAD_ID}`, {
        method: "DELETE",
      });
    }

    return new Response(null, {
      status: 301,
      headers: {
        "Cache-Control": "no-cache",
        Location: domain,
        webhookStatus: discordReq.status.toString(),
      },
    });
  }

  return new Response("No user-agent, impressive!");
}

const worker: ExportedHandler<Env> = { fetch: handleRequest };
export default worker;
