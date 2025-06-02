// server.ts
import { serveFile, serveDir } from "jsr:@std/http";

async function handler(request) {
  const url  = new URL(request.url);
  const path = url.pathname;

  if (path === "/" || path === "/home") {
    return serveFile(request, "index.html");
  }

  // Serve static files from current folder
  return serveDir(request, {
    fsRoot: ".",
    urlRoot: "", // svarar direkt på t.ex. /style.css
  });
}

Deno.serve({ port: 3000 }, handler);
