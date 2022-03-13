import isbot from "isbot";

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

export async function handleRequest(request: Request): Promise<Response> {
  const userAgent = request.headers.get("user-agent");

  if (userAgent) {
    if (isbot(userAgent)) {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new Response(null, {
      status: 301,
      headers: {
        "Cache-Control": "no-cache",
        Location: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      },
    });
  }

  return new Response("No user-agent, impressive!");
}
