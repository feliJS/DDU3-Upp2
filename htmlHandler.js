// server.ts
import { serveFile, serveDir } from "jsr:@std/http";

async function handler(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/" || path === "/home") {
    return serveFile(request, "index.html");
  }

  return serveDir(request, { fsRoot: "static", urlRoot: "static" });
  /*
    fsRoot är den faktiska mappen i filsystemet.

    urlRoot är vad användaren skriver i URL:en. */
}


Deno.serve(handler);

